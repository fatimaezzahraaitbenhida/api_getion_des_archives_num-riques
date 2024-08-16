package com.prjt.archive.Controller;

import com.prjt.archive.Dto.LoginDTO;
import com.prjt.archive.Dto.UtilisateurDTO;
import com.prjt.archive.Entity.Document;
import com.prjt.archive.Entity.ServiceEntity;
import com.prjt.archive.Entity.Site;
import com.prjt.archive.Entity.Utilisateur;
import com.prjt.archive.Repo.ServiceRepo;
import com.prjt.archive.Repo.SiteRepo;
import com.prjt.archive.Repo.UtilisateurRepo;
import com.prjt.archive.Service.DocumentService;
import com.prjt.archive.Service.UtilisateurService;
import com.prjt.archive.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/utilisateur")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private UtilisateurRepo utilisateurRepo;

    @Autowired
    private ServiceRepo serviceRepo;

    @Autowired
    private DocumentService documentService;

    @Autowired
    private SiteRepo siteRepo;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO loginDTO) {
        LoginResponse loginResponse = utilisateurService.loginUtilisateur(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveUser(@RequestBody UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(utilisateurDTO.getGmail());
        utilisateur.setPrenom(utilisateurDTO.getPrenom());
        utilisateur.setPassword(utilisateurDTO.getPassword());
        utilisateur.setTypeUser(utilisateurDTO.getTypeUser());

        Site site = siteRepo.findById(utilisateurDTO.getSiteId())
                .orElseThrow(() -> new ResourceNotFoundException("Site not found"));
        utilisateur.setSite(site);

        if (utilisateurDTO.getServiceId() != null) {
            ServiceEntity service = serviceRepo.findById(utilisateurDTO.getServiceId())
                    .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
            utilisateur.setService(service);
        }

        utilisateurRepo.save(utilisateur);
        return ResponseEntity.ok("User saved successfully");
    }

    @GetMapping("/read")
    public ResponseEntity<List<UtilisateurDTO>> readUsers() {
        List<Utilisateur> utilisateurs = utilisateurService.lire();
        List<UtilisateurDTO> utilisateurDTOs = utilisateurs.stream()
                .map(user -> {
                    UtilisateurDTO dto = new UtilisateurDTO();
                    dto.setId(user.getId());
                    dto.setGmail(user.getEmail());
                    dto.setPrenom(user.getPrenom());
                    dto.setPassword(user.getPassword()); // Vérifiez si ce champ est nécessaire
                    dto.setTypeUser(user.getTypeUser());
                    dto.setSiteId(user.getSite() != null ? user.getSite().getId() : null);
                    dto.setServiceId(user.getService() != null ? user.getService().getId_service() : null);
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(utilisateurDTOs);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UtilisateurDTO> updateUtilisateur(@PathVariable("id") Long id, @RequestBody UtilisateurDTO utilisateurDTO) {
        if (id == null || utilisateurDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        try {
            Utilisateur updatedUser = utilisateurService.modifier(id, utilisateurDTO);
            UtilisateurDTO dto = new UtilisateurDTO();
            dto.setId(updatedUser.getId());
            dto.setGmail(updatedUser.getEmail());
            dto.setPrenom(updatedUser.getPrenom());
            dto.setPassword(updatedUser.getPassword()); // Vérifiez si ce champ est nécessaire
            dto.setTypeUser(updatedUser.getTypeUser());
            dto.setSiteId(updatedUser.getSite() != null ? updatedUser.getSite().getId() : null);
            dto.setServiceId(updatedUser.getService() != null ? updatedUser.getService().getId_service() : null);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @GetMapping("/by-email")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("L'email ne peut pas être nul ou vide.");
        }

        UtilisateurDTO utilisateurDTO = utilisateurService.getUtilisateurByEmail(email);

        if (utilisateurDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(utilisateurDTO);
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            utilisateurService.supprimer(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }



    @GetMapping("/emails")
    public ResponseEntity<List<String>> getAllEmails() {
        List<String> emails = utilisateurService.getAllEmails();
        return ResponseEntity.ok(emails);
    }

    @GetMapping("/id")
    public ResponseEntity<?> getUserIdByEmail(@RequestParam String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("L'email ne peut pas être nul ou vide.");
        }

        Optional<Utilisateur> optionalUtilisateur = utilisateurRepo.findByEmail(email);
        if (!optionalUtilisateur.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        }

        Utilisateur utilisateur = optionalUtilisateur.get();
        return ResponseEntity.ok(Collections.singletonMap("id", utilisateur.getId()));
    }

    @GetMapping("/{id}/documents")
    public ResponseEntity<List<Document>> getDocumentsByUtilisateurId(@PathVariable Long id) {
        List<Document> documents = documentService.getDocumentsByUtilisateurId(id);
        return ResponseEntity.ok(documents);
    }
}
