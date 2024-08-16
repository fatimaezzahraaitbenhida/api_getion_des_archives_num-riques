package com.prjt.archive.Service;

import com.prjt.archive.Entity.DemandeAutorisation;

import java.util.List;
import java.util.Optional;

public interface DemandeAutorisationService {
    List<DemandeAutorisation> getDemandesByEmployeId(Long id);


    DemandeAutorisation createDemande(Long userId, Long documentId);

    List<DemandeAutorisation> getAllDemandes();

    Optional<Object> updateStatut(Long id, String statut);
}
