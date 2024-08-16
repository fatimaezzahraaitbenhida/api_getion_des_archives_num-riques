package com.prjt.archive.Service.impl;


import com.prjt.archive.Dto.SiteDTO;
import com.prjt.archive.Entity.Departement;
import com.prjt.archive.Entity.Site;
import com.prjt.archive.Entity.ServiceEntity;

import com.prjt.archive.Repo.SiteRepo;
import com.prjt.archive.Service.SiteService;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SiteIMPL implements SiteService {
    @Autowired
    private SiteRepo siteRepository;


    @Override
    public Site addSite(Site site) {
        // Vérification des champs nuls avant de sauvegarder
        if (site.getNomSite() == null || site.getNomSite().isEmpty()) {
            throw new IllegalArgumentException("Le nom du site ne peut pas être nul.");
        }
        // Vérification de l'unicité du nom du site
        if (siteRepository.existsByNomSite(site.getNomSite())) {
            throw new IllegalArgumentException("Le nom du site doit être unique.");
        }
        return siteRepository.save(site);
    }
    @Override
    public List<Site> getSitesByServiceId(Long serviceId) {
        return siteRepository.findByServiceId(serviceId); // Adjust this if necessary
    }
    @Transactional
    public List<Site> getAllSites() {
        return siteRepository.findAll();
    }


    @Override
    public Site getSiteById(Long id) {
        Site site = siteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Site non trouvé pour l'ID: " + id));
        Hibernate.initialize(site.getDepartements()); // Initialize the collection
        return site;
    }


    @Override
    public Site updateSite(Long id, SiteDTO siteDTO) {
        Optional<Site> siteOptional = siteRepository.findById(id);
        if (siteOptional.isPresent()) {
            Site site = siteOptional.get();
            if (siteRepository.existsByNomSite(siteDTO.getNomSite())) {
                throw new IllegalArgumentException("Le nom du site doit être unique.");
            }
            site.setNomSite(siteDTO.getNomSite());
            // Vous pouvez ajouter d'autres mises à jour ici si nécessaire
            return siteRepository.save(site);
        } else {
            throw new RuntimeException("Site non trouvé avec l'ID : " + id);
        }
    }

    public String getSocieteNameBySiteId(Long siteId) {
        Optional<Site> optionalSite = siteRepository.findById(siteId);
        if (optionalSite.isPresent()) {
            Site site = optionalSite.get();
            if (site.getSociete() != null) {
                return site.getSociete().getNomSociete();
            }
        }
        return "Non spécifié"; // Handle cases where site or societe is not found
    }
    @Override
    public void deleteSite(Long id) {
        Site site = getSiteById(id);
        siteRepository.delete(site);
    }
    @Transactional
    public SiteDTO convertToDTO(Site site) {
        SiteDTO dto = new SiteDTO();
        dto.setId(site.getId());
        dto.setNomSite(site.getNomSite());
        dto.setSocieteId(site.getSociete().getId());
        dto.setDepartementId(site.getDepartements().stream()
                .findFirst()
                .map(Departement::getId_dep)
                .orElse(null));

        dto.setServiceIds(site.getServices().stream()
                .map(ServiceEntity::getId_service)
                .collect(Collectors.toSet()));

        return dto;
    }

}





