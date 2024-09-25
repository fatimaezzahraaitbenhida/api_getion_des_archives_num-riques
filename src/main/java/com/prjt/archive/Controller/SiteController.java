package com.prjt.archive.Controller;

import com.prjt.archive.Dto.ServiceDTO;
import com.prjt.archive.Dto.SiteDTO;
import com.prjt.archive.Dto.UtilisateurDTO;
import com.prjt.archive.Entity.Departement;
import com.prjt.archive.Entity.Site;
import com.prjt.archive.Entity.Societe;
import com.prjt.archive.Repo.SiteRepo;
import com.prjt.archive.Service.DepService;
import com.prjt.archive.Service.SiteService;
import com.prjt.archive.Service.UtilisateurService;
import com.prjt.archive.Service.impl.UtilisateurIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/site")
public class SiteController {

    @Autowired
    private SiteService siteService;
    @Autowired
    private DepService depService;
    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private SiteRepo siteRepository;

    @PostMapping("/add")
    public ResponseEntity<Site> addSite(@RequestBody SiteDTO siteDTO) {
        try {
            Site site = new Site();
            site.setNomSite(siteDTO.getNomSite());

            // Associer la société via l'identifiant
            if (siteDTO.getSocieteId() != null) {
                Societe societe = new Societe(); // Assurez-vous que l'objet Societe est chargé correctement
                societe.setId(siteDTO.getSocieteId());
                site.setSociete(societe);
            } else {
                throw new IllegalArgumentException("L'identifiant de la société ne peut pas être nul.");
            }

            Site newSite = siteService.addSite(site);
            return ResponseEntity.ok(newSite);
        } catch (Exception e) {
            e.printStackTrace(); // Affichez l'exception pour le débogage
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<SiteDTO>> getAllSites() {
        List<Site> sites = siteService.getAllSites();
        List<SiteDTO> siteDTOs = sites.stream()
                .map(siteService::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(siteDTOs);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Site> getSiteById(@PathVariable Long id) {
        Site site = siteService.getSiteById(id);
        return ResponseEntity.ok(site);
    }
    @GetMapping("/{siteId}/services")
    public ResponseEntity<Set<ServiceDTO>> getServicesBySite(@PathVariable Long siteId) {
        Site site = siteRepository.findById(siteId).orElse(null);
        if (site == null) {
            return ResponseEntity.notFound().build();
        }

        Set<ServiceDTO> services = site.getServices().stream()
                .map(service -> {
                    ServiceDTO dto = new ServiceDTO();
                    dto.setId(service.getId_service());
                    dto.setNomService(service.getNomService());
                    dto.setId_dep(service.getDepartement().getId_dep());
                    return dto;
                })
                .collect(Collectors.toSet());

        return ResponseEntity.ok(services);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Site> updateSite(@PathVariable Long id, @RequestBody SiteDTO siteDTO) {
        Site updatedSite = siteService.updateSite(id, siteDTO);
        return ResponseEntity.ok(updatedSite);
    }
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Site>> getSitesByService(@PathVariable Long serviceId) {
        List<Site> sites = siteService.getSitesByServiceId(serviceId);
        return ResponseEntity.ok(sites);
    }
    @GetMapping("/{id}/departements")
    public ResponseEntity<List<Departement>> getDepartementsBySiteId(@PathVariable Long id) {
        List<Departement> departements = depService.getDepartementsBySiteId(id);
        return ResponseEntity.ok(departements);
    }
    @GetMapping("/societe-name/{siteId}")
    public String getSocieteNameBySiteId(@PathVariable Long siteId) {
        return siteService.getSocieteNameBySiteId(siteId);
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSite(@PathVariable Long id) {
        siteService.deleteSite(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{siteId}/utilisateurs")
    public ResponseEntity<List<UtilisateurDTO>> getUtilisateursBySite(@PathVariable Long siteId) {
        Site site = siteRepository.findById(siteId).orElse(null);
        if (site == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<UtilisateurDTO> utilisateurs = site.getUsr().stream()
                .map(utilisateurService::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(utilisateurs);
    }
    @PostMapping("/{siteId}/departements/{departementId}")
    public ResponseEntity<String> addDepartementToSite(@PathVariable Long siteId, @PathVariable Long departementId) {
        siteService.addDepartementToSite(siteId, departementId);
        return ResponseEntity.ok("Departement added to Site successfully.");
    }
}