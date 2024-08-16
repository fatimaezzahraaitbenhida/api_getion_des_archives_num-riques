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
public class Service {

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();

    private static String getPathToGoogleCredentials() {
        return Paths.get(System.getProperty("user.dir"), "cred.json").toString();
    }

    public Res uploadFileToDrive(File file, String typeDoc) throws IOException, GeneralSecurityException {
        Res res = new Res();
        try {
            // Définissez les ID des dossiers selon le type de document
            String folderId;
            switch (typeDoc) {
                case "Contrats":
                    folderId = "1rl-EW0cqaaSy5oaiP59BbjjlRxb32n3W"; // ID du dossier Contrats
                    break;
                case "Factures":
                    folderId = "1t3Q-yRAO8EmjiJE2CsykaLBHo1ifScyY"; // ID du dossier Factures
                    break;
                case "Reçus":
                    folderId = "1EHaUrg_vIvCX_fbt49l5UIXNUb27boNR"; // ID du dossier Reçus
                    break;
                case "BilansComptables":
                    folderId = "1YwIBb3DQeIp9dNaWd79ikX6Q0_F30Ahb"; // ID du dossier BilansComptables
                    break;
                case "DéclarationsFiscales":
                    folderId = "180Bc9q2h3lLrVJMhMjk_WnlXOvehY_2h"; // ID du dossier DéclarationsFiscales
                    break;
                case "RelevésBancaires":
                    folderId = "1q9l4ReOMCZdFWFiYkLVg70pa-hKsnIpl"; // ID du dossier RelevésBancaires
                    break;
                case "AccordsDeConfidentialité":
                    folderId = "1hLAJG5AwbUFe5sMDMmQDfCThAYJDXQRg"; // ID du dossier AccordsDeConfidentialité
                    break;
                case "LitigesEtContentieux":
                    folderId = "1cJbFaDgh440pyefbQiJ159hfuJllHDYO"; // ID du dossier LitigesEtContentieux
                    break;
                case "StatutsDeLaSociété":
                    folderId = "1HFW8ZrY1cbsIrMlRJDVH-3HtYneUUJvN"; // ID du dossier StatutsDeLaSociété
                    break;
                default:
                    folderId = "1fRL4lzmLIv0bJ0Zp616FgeQFnADpR8oW"; // ID du dossier ex1 par défaut
                    break;
            }

            Drive drive = createDriveService();
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
}
