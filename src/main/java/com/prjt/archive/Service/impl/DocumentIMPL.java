package com.prjt.archive.Service.impl;

import com.prjt.archive.Dto.DocumentDTO;
import com.prjt.archive.Entity.Document;
import com.prjt.archive.Entity.Utilisateur;
import com.prjt.archive.Repo.DocumentRepository;
import com.prjt.archive.Repo.UtilisateurRepo;
import com.prjt.archive.Service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentIMPL implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UtilisateurRepo utilisateurRepo;

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






}
