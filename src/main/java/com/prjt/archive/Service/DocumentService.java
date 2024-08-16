package com.prjt.archive.Service;

import com.prjt.archive.Dto.DocumentDTO;
import com.prjt.archive.Entity.Document;

import java.util.List;

public interface DocumentService {

    // Méthode pour lire tous les documents
    List<Document> lire();

    // Méthode pour supprimer un document par son ID
    String supprimer(Long id);

    // Méthode pour modifier un document existant
    Document modifier(Long id, Document document);

    // Méthode pour ajouter un document et l'associer à un utilisateur par son ID
    Document add(Long id_user, DocumentDTO documentDTO);

    List<Document> getDocumentsByUtilisateurId(Long id);

    List<Document> findByTypeAndEmail(String type, String email);

    List<DocumentDTO> liree();

    List<DocumentDTO> getAllDocuments();

    String getSocieteNameBySiteId(Long siteId);
}
