package com.prjt.archive.Service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.auth.oauth2.GoogleCredentials;
import com.prjt.archive.response.Res;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.Collections;

@org.springframework.stereotype.Service
public class GoogleDriveService {

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();

    private static String getPathToGoogleCredentials() {
        return Paths.get(System.getProperty("user.dir"), "cred.json").toString();
    }

    private Drive drive;

    public GoogleDriveService() throws GeneralSecurityException, IOException {
        this.drive = createDriveService();
    }

    public Res uploadFileToDrive(File file, String typeDoc) throws IOException, GeneralSecurityException {
        Res res = new Res();
        try {
            // Définissez les ID des dossiers selon le type de document
            String folderId = getFolderIdForType(typeDoc);

            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(file.getName());
            fileMetaData.setParents(Collections.singletonList(folderId));

            FileContent mediaContent = new FileContent("application/octet-stream", file);
            com.google.api.services.drive.model.File uploadFile = drive.files().create(fileMetaData, mediaContent)
                    .setFields("id")
                    .execute();

            String fileUrl = "https://drive.google.com/uc?export=view&id=" + uploadFile.getId();
            res.setStatus(200);
            res.setMessage("File successfully uploaded to Drive.");
            res.setUrl(fileUrl);
        } catch (Exception e) {
            res.setStatus(500);
            res.setMessage("Error occurred: " + e.getMessage());
        } finally {
            Files.deleteIfExists(file.toPath());
        }
        return res;
    }

    public String getFolderIdForType(String typeDoc) {
        switch (typeDoc) {
            case "Contrats":
                return "1rl-EW0cqaaSy5oaiP59BbjjlRxb32n3W";
            case "Factures":
                return "1t3Q-yRAO8EmjiJE2CsykaLBHo1ifScyY";
            case "Reçus":
                return "1EHaUrg_vIvCX_fbt49l5UIXNUb27boNR";
            case "BilansComptables":
                return "1YwIBb3DQeIp9dNaWd79ikX6Q0_F30Ahb";
            case "DéclarationsFiscales":
                return "180Bc9q2h3lLrVJMhMjk_WnlXOvehY_2h";
            case "RelevésBancaires":
                return "1q9l4ReOMCZdFWFiYkLVg70pa-hKsnIpl";
            case "AccordsDeConfidentialité":
                return "1hLAJG5AwbUFe5sMDMmQDfCThAYJDXQRg";
            case "LitigesEtContentieux":
                return "1cJbFaDgh440pyefbQiJ159hfuJllHDYO";
            case "StatutsDeLaSociété":
                return "1HFW8ZrY1cbsIrMlRJDVH-3HtYneUUJvN";
            default:
                return "1jn3TJNj7JOSTT6AshPCjCSNH4ZTtOz78";
        }
    }

    private Drive createDriveService() throws IOException, GeneralSecurityException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(SERVICE_ACCOUNT_KEY_PATH))
                .createScoped(Collections.singleton(DriveScopes.DRIVE));

        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                new HttpRequestInitializer() {
                    @Override
                    public void initialize(com.google.api.client.http.HttpRequest request) throws IOException {
                        credentials.refreshIfExpired();
                        request.getHeaders().setAuthorization("Bearer " + credentials.getAccessToken().getTokenValue());
                    }
                }
        ).build();
    }

    public String moveFile(String fileId, String typeDoc) throws IOException {
        // Define the new folder ID based on document type
        String newFolderId = getFolderIdForType(typeDoc);

        // Retrieve the file from Google Drive
        com.google.api.services.drive.model.File file = drive.files().get(fileId)
                .setFields("parents")
                .execute();

        // Log the current and new folder IDs
        String previousParents = String.join(",", file.getParents());
        System.out.println("Previous Parents: " + previousParents);
        System.out.println("New Folder ID: " + newFolderId);

        // Remove the file from its previous parent folder
        com.google.api.services.drive.model.File updatedFile = drive.files().update(fileId, null)
                .setAddParents(newFolderId)
                .setRemoveParents(previousParents)
                .setFields("id, parents")
                .execute();

        // Log the updated file parents
        System.out.println("Updated File Parents: " + String.join(",", updatedFile.getParents()));

        return fileId; // Return the file ID to update the URL
    }


}
