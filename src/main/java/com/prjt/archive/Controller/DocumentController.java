package com.prjt.archive.Controller;

import com.prjt.archive.Dto.DocumentDTO;
import com.prjt.archive.Entity.Document;
import com.prjt.archive.Entity.ServiceEntity;
import com.prjt.archive.Repo.DocumentRepository;
import com.prjt.archive.Repo.UtilisateurRepo;
import com.prjt.archive.Service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/doc")
public class DocumentController {

    @Autowired
    private DocumentService documentService;
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private UtilisateurRepo utilisateurRepo;
    @PostMapping(value = "/save/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> saveDocument(
            @PathVariable Long id,
            @RequestBody DocumentDTO documentDTO) {
        try {
            Document savedDocument = documentService.add(id, documentDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDocument);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving document: " + e.getMessage());
        }
    }
    @GetMapping("/read")
    public List<DocumentDTO> read() {
        return documentService.getAllDocuments();
    }
    @GetMapping("/read/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable("id") Long id) {
        Optional<Document> document = documentRepository.findById(id);

        if (document.isPresent()) {
            return ResponseEntity.ok(document.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/societe-name/{siteId}")
    public ResponseEntity<?> getSocieteNameBySiteId(@PathVariable Long siteId) {
        try {
            String societeName = documentService.getSocieteNameBySiteId(siteId);
            if (societeName != null) {
                return ResponseEntity.ok(societeName);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Société not found for Site ID: " + siteId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving société name: " + e.getMessage());
        }
    }
    @GetMapping("/test-service/{userId}")
    public ResponseEntity<?> testService(@PathVariable Long userId) {
        return utilisateurRepo.findById(userId)
                .map(user -> {
                    ServiceEntity service = user.getService();
                    if (service != null) {
                        return ResponseEntity.ok(service.getNomService());
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found");
                    }
                }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    /*@GetMapping("/read")
    public List<Document> read() {
        return documentService.lire();
    }*/

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return documentService.supprimer(id);
    }

    @PutMapping("/update/{id}")
    public Document update(@PathVariable Long id, @RequestBody Document document) {
        return documentService.modifier(id, document);
    }
    @GetMapping("/by-type-and-email")
    public ResponseEntity<List<Document>> getDocumentsByTypeAndEmail(
            @RequestParam String type,
            @RequestParam String email) {
        try {
            List<Document> documents = documentService.findByTypeAndEmail(type, email);
            return ResponseEntity.ok(documents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}