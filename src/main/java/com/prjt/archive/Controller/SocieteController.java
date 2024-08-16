package com.prjt.archive.Controller;

import com.prjt.archive.Dto.SocieteDTO;
import com.prjt.archive.Entity.Societe;
import com.prjt.archive.Service.SocieteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/societe")
public class SocieteController {
    @Autowired
    private SocieteService societeService;

    @PostMapping("/add")
    public ResponseEntity<Societe> addSociete(@RequestBody SocieteDTO societeDTO) {
        try {
            Societe societe = new Societe();
            societe.setNomSociete(societeDTO.getNomSociete());
            Societe newSociete = societeService.addSociete(societe);
            return ResponseEntity.ok(newSociete);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Societe>> getAllSocietes() {
        List<Societe> societes = societeService.getAllSocietes();
        return ResponseEntity.ok(societes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Societe> getSocieteById(@PathVariable Long id) {
        Societe societe = societeService.getSocieteById(id);
        return ResponseEntity.ok(societe);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Societe> updateSociete(@PathVariable Long id, @RequestBody SocieteDTO societeDTO) {
        try {
            Societe updatedSociete = societeService.updateSociete(id, societeDTO);
            return ResponseEntity.ok(updatedSociete);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSociete(@PathVariable Long id) {
        societeService.deleteSociete(id);
        return ResponseEntity.noContent().build();
    }
}
