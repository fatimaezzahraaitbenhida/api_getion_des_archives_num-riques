package com.prjt.archive.Service.impl;

import com.prjt.archive.Dto.DepDTO;
import com.prjt.archive.Entity.Departement;
import com.prjt.archive.Entity.Site;
import com.prjt.archive.Repo.DepartementRepo;
import com.prjt.archive.Service.DepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepIMPL implements DepService {

    @Autowired
    private DepartementRepo departementRepository;

    @Override
    public Departement addDepartement(Departement departement) {
        // Vérification des champs nuls avant de sauvegarder
        if (departement.getNomDep() == null || departement.getNomDep().isEmpty()) {
            throw new IllegalArgumentException("Le nom du département ne peut pas être nul.");
        }
        if (departementRepository.existsByNomDep(departement.getNomDep())) {
            throw new IllegalArgumentException("Le nom du département doit être unique.");
        }
        return departementRepository.save(departement);
    }

    @Override
    public List<Departement> getAllDepartements() {
        return departementRepository.findAll();
    }

    @Override
    public Departement getDepartementById(Long id) {
        Optional<Departement> departement = departementRepository.findById(id);
        return departement.orElseThrow(() -> new IllegalArgumentException("Département non trouvé pour l'ID: " + id));
    }


    @Override
    public Departement updateDepartement(Long id, DepDTO depDTO) {
        Optional<Departement> departementOptional = departementRepository.findById(id);
        if (departementOptional.isPresent()) {
            Departement departement = departementOptional.get();
            if (departementRepository.existsByNomDep(depDTO.getNomDepartement())) {
                throw new IllegalArgumentException("Le nom du département doit être unique.");
            }

            departement.setNomDep(depDTO.getNomDepartement());
            // Vous pouvez ajouter d'autres mises à jour ici si nécessaire
            return departementRepository.save(departement);
        } else {
            throw new RuntimeException("Département non trouvé avec l'ID : " + id);
        }
    }

    @Override
    public void deleteDepartement(Long id) {
        Departement departement = getDepartementById(id);
        // Remove the department from all associated sites
        for (Site site : departement.getSites()) {
            site.getDepartements().remove(departement);
        }
        departementRepository.delete(departement);
    }



    @Override
    public List<Departement> getDepartementsBySiteId(Long siteId) {
        return departementRepository.findBySitesId(siteId);
    }



}