package com.prjt.archive.Controller;

import com.prjt.archive.Entity.DemandeAutorisation;
import com.prjt.archive.Repo.DemandeAutorisationRepository;
import com.prjt.archive.Service.DemandeAutorisationService;
import com.prjt.archive.response.DemandeUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/demande")
public class DemandeAutorisationController {
    @Autowired
private DemandeAutorisationService demandeAutorisationService;

    @Autowired
    private DemandeAutorisationRepository demandeAutorisationRepository;

    @PostMapping("/create")
    public ResponseEntity<DemandeAutorisation> createDemande(
            @RequestParam Long userId,
            @RequestParam Long documentId) {
        DemandeAutorisation createdDemande = demandeAutorisationService.createDemande(userId, documentId);
        return ResponseEntity.ok(createdDemande);
    }
    @GetMapping("/all")
    public ResponseEntity<List<DemandeAutorisation>> getAllDemandes() {
        List<DemandeAutorisation> demandes = demandeAutorisationService.getAllDemandes();
        return ResponseEntity.ok(demandes);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDemandeStatus(@PathVariable Long id, @RequestBody DemandeUpdateRequest request) {
        return demandeAutorisationService.updateStatut(id, request.getStatut())
                .map(updatedDemande -> ResponseEntity.ok(updatedDemande))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Demande non trouvée"));
    }
    @GetMapping("/employe/{id}")
    public ResponseEntity<List<DemandeAutorisation>> getDemandesByEmployeId(@PathVariable Long id) {
        List<DemandeAutorisation> demandes = demandeAutorisationService.getDemandesByEmployeId(id);
        return ResponseEntity.ok(demandes);
    }
}