package com.prjt.archive.Controller;

import com.prjt.archive.Service.GoogleDriveService;
import com.prjt.archive.response.Res;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
public class Conn {
    @Autowired
    private GoogleDriveService fileGoogleDriveService;

    @PostMapping("/uploadToGoogleDrive")
    public Res handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("typeDoc") String typeDoc) throws IOException, GeneralSecurityException {
        Res res = new Res();

        if (file.isEmpty()) {
            res.setStatus(400);
            res.setMessage("File is empty");
            return res;
        }

        File tempFile = File.createTempFile("temp", null);
        file.transferTo(tempFile);

        // Call the service method to upload the file with the type of document
        res = fileGoogleDriveService.uploadFileToDrive(tempFile, typeDoc);

        return res;
    }
    @PostMapping("/moveFile")
    public Res handleFileMove(@RequestParam("fileId") String fileId, @RequestParam("newTypeDoc") String newTypeDoc) throws IOException, GeneralSecurityException {
        Res res = new Res();

        try {
            // Appeler la méthode de service pour déplacer le fichier et obtenir l'URL mise à jour
            String fileUrl = fileGoogleDriveService.moveFile(fileId, newTypeDoc);
            res.setStatus(200);
            res.setMessage("File successfully moved.");
            res.setUrl(fileUrl); // Définir l'URL mise à jour dans la réponse
        } catch (Exception e) {
            res.setStatus(500);
            res.setMessage("Error occurred: " + e.getMessage());
        }

        return res;
    }}

