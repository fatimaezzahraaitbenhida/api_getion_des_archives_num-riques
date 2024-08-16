package com.prjt.archive.Service.impl;

import com.prjt.archive.Dto.SocieteDTO;
import com.prjt.archive.Entity.Societe;
import com.prjt.archive.Repo.SocieteRepo;
import com.prjt.archive.Service.SocieteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocieteIMPL implements SocieteService {

    @Autowired
    private SocieteRepo societeRepository;

    @Override
    public Societe addSociete(Societe societe) {
        // Vérification des champs nuls avant de sauvegarder
        if (societe.getNomSociete() == null || societe.getNomSociete().isEmpty()) {
            throw new IllegalArgumentException("Le nom de la société ne peut pas être nul.");
        }
        // Vérification de l'unicité du nom de la société
        if (societeRepository.existsByNomSociete(societe.getNomSociete())) {
            throw new IllegalArgumentException("Le nom de la société doit être unique.");
        }
        return societeRepository.save(societe);
    }

    @Override
    public List<Societe> getAllSocietes() {
        return societeRepository.findAll();
    }

    @Override
    public Societe getSocieteById(Long id) {
        return societeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Société non trouvée pour l'ID: " + id));
    }

    @Override
    public Societe updateSociete(Long id, SocieteDTO societeDTO) {
        Societe societe = societeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Société non trouvée avec l'ID : " + id));

        // Vérification de l'unicité du nom de la société
        if (societeRepository.existsByNomSociete(societeDTO.getNomSociete()) &&
                !societe.getNomSociete().equals(societeDTO.getNomSociete())) {
            throw new IllegalArgumentException("Le nom de la société doit être unique.");
        }

        societe.setNomSociete(societeDTO.getNomSociete());
        // Vous pouvez ajouter d'autres mises à jour ici si nécessaire
        return societeRepository.save(societe);
    }

    @Override
    public void deleteSociete(Long id) {
        Societe societe = getSocieteById(id);
        societeRepository.delete(societe);
    }
}
