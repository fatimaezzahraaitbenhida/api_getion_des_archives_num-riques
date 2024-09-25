package com.prjt.archive.Service.impl;

import com.prjt.archive.Controller.DocumentNotFoundException;
import com.prjt.archive.Controller.ResourceNotFoundException;
import com.prjt.archive.Dto.DocumentDTO;
import com.prjt.archive.Entity.Document;
import com.prjt.archive.Entity.Utilisateur;
import com.prjt.archive.Repo.DocumentRepository;
import com.prjt.archive.Repo.UtilisateurRepo;
import com.prjt.archive.Service.DocumentService;
import com.prjt.archive.Service.GoogleDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.prjt.archive.Entity.Document.extractFileIdFromUrl;

@Service
public class DocumentIMPL implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UtilisateurRepo utilisateurRepo;
    @Autowired
    private GoogleDriveService googleDriveService;

    @Override
    public List<Document> lire() {
        return documentRepository.findAll();
    }

    @Override
    public String supprimer(Long id) {
        documentRepository.deleteById(id);
        return "Document supprimé avec succès";
    }

    @Override
    public Document modifier(Long id, Document document) {
        return documentRepository.findById(id).map(existingDocument -> {
            existingDocument.setNom(document.getNom());
            existingDocument.setDate_creation(document.getDate_creation());
            existingDocument.setType_doc(document.getType_doc());
            existingDocument.setChemin(document.getChemin());
            return documentRepository.save(existingDocument);
        }).orElseThrow(() -> new RuntimeException("Document non trouvé"));
    }

    @Override
    public Document add(Long id_user, DocumentDTO documentDTO) {
        Utilisateur user = utilisateurRepo.findById(id_user)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Vérification de l'unicité du nom du document
        if (documentRepository.existsByNom(documentDTO.getNom())) {
            throw new IllegalArgumentException("Le nom du document doit être unique.");
        }

        Document document = new Document();
        document.setNom(documentDTO.getNom());
        document.setDate_creation(documentDTO.getDateCreation());
        document.setType_doc(documentDTO.getTypeDoc());
        document.setChemin(documentDTO.getChemin());
        document.setUser(user);

        return documentRepository.save(document);
    }

    public List<Document> getDocumentsByUtilisateurId(Long utilisateurId) {
        return documentRepository.findByUserId(utilisateurId);
    }
    public List<Document> findByTypeAndEmail(String type, String email) {
        return documentRepository.findByTypeAndEmail(type, email);
    }
    public List<DocumentDTO> liree() {
        return documentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    // Ajoutez cette méthode dans DocumentIMPL
    public String getSocieteNameBySiteId(Long siteId) {
        return documentRepository.findSocieteNameBySiteId(siteId);
    }

    @Override
    public List<DocumentDTO> getAllDocuments() {
        List<Document> documents = documentRepository.findAll(); // Récupérer tous les documents du repository
        return documents.stream()
                .map(this::convertToDTO) // Convertir chaque Document en DocumentDTO
                .collect(Collectors.toList());
    }


    private DocumentDTO convertToDTO(Document document) {
        DocumentDTO dto = new DocumentDTO();
        dto.setIdDoc(document.getId_doc());
        dto.setNom(document.getNom());
        dto.setDateCreation(document.getDate_creation());
        dto.setTypeDoc(document.getType_doc());
        dto.setChemin(document.getChemin());

        if (document.getUser() != null) {
            dto.setEmployeId(document.getUser().getId());
            dto.setUserEmail(document.getUser().getEmail());
            if (document.getUser().getSite() != null) {
                dto.setSiteName(document.getUser().getSite().getNomSite());
            }
            if (document.getUser().getService() != null) {
                dto.setServiceName(document.getUser().getService().getNomService());
            }
        }

        return dto;
    }
    @Override
    public Document updateDocument(Long id, DocumentDTO documentDTO) throws IOException {
        // Trouver le document existant
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document non trouvé"));

        // Mettre à jour les informations du document
        document.setNom(documentDTO.getNom());
        document.setDate_creation(documentDTO.getDateCreation());
        document.setType_doc(documentDTO.getTypeDoc());

        // Extraire l'ID du fichier depuis l'URL actuelle
        String oldFileId = extractFileIdFromUrl(document.getChemin());
        if (oldFileId == null) {
            throw new IOException("ID de fichier invalide extrait de l'URL");
        }
        System.out.println("Old File ID: " + oldFileId);

        // Déplacer le fichier sur Google Drive et obtenir le nouvel ID de fichier
        String newFolderId = googleDriveService.getFolderIdForType(documentDTO.getTypeDoc());
        if (newFolderId == null) {
            throw new IOException("ID de dossier invalide pour le type de document");
        }
        System.out.println("New Folder ID: " + newFolderId);

        // Appeler la méthode moveFile pour déplacer le fichier
        String newFileId = googleDriveService.moveFile(oldFileId, documentDTO.getTypeDoc());
        if (newFileId == null) {
            throw new IOException("Échec du déplacement du fichier sur Google Drive");
        }
        System.out.println("New File ID: " + newFileId);

        // Mettre à jour le chemin du fichier avec le nouvel ID
        String newFileUrl = "https://drive.google.com/uc?export=view&id=" + newFileId;
        document.setChemin(newFileUrl);

        // Enregistrer le document mis à jour
        return documentRepository.save(document);
    }











    private String getFolderIdByType(String typeDoc) {
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
}





