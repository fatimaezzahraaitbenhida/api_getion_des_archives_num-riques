package com.prjt.archive.Service.impl;

import com.prjt.archive.Entity.DemandeAutorisation;
import com.prjt.archive.Entity.Utilisateur;
import com.prjt.archive.Repo.DemandeAutorisationRepository;
import com.prjt.archive.Repo.UtilisateurRepo;
import com.prjt.archive.Service.DemandeAutorisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DemandeAutorisationIMPL implements DemandeAutorisationService {
    @Autowired
    private DemandeAutorisationRepository demandeAutorisationRepository;

    @Autowired
    private UtilisateurRepo utilisateurRepository;

    public DemandeAutorisation createDemande(Long userId, Long documentId) {
        Utilisateur utilisateur = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        DemandeAutorisation demandeAutorisation = new DemandeAutorisation();
        demandeAutorisation.setUtilisateur(utilisateur);
        demandeAutorisation.setDocumentId(documentId);
        demandeAutorisation.setStatut("En attente");
        return demandeAutorisationRepository.save(demandeAutorisation);
    }

    public List<DemandeAutorisation> getDemandesByEmployeId(Long employeId) {
        return demandeAutorisationRepository.findByUtilisateurId(employeId);
    }
    public List<DemandeAutorisation> getAllDemandes() {
        return demandeAutorisationRepository.findAll();
    }
    public Optional<Object> updateStatut(Long id, String statut) {
        return demandeAutorisationRepository.findById(id)
                .map(demande -> {
                    demande.setStatut(statut);
                    return demandeAutorisationRepository.save(demande);
                });
    }

}