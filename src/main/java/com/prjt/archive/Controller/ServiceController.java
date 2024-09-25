package com.prjt.archive.Controller;

import com.prjt.archive.Dto.ServiceDTO;
import com.prjt.archive.Entity.Departement;
import com.prjt.archive.Entity.ServiceEntity;
import com.prjt.archive.Entity.Utilisateur;
import com.prjt.archive.Service.DepService;
import com.prjt.archive.Service.ServiceService;
import com.prjt.archive.Service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/service")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;
    @Autowired
    private DepService departementService;

    @Autowired
    private UtilisateurService utilisateurService;
    @PostMapping("/add")
    public ResponseEntity<ServiceEntity> addService(@RequestBody ServiceDTO serviceDTO) {
        System.out.println("Données reçues : " + serviceDTO);
        try {
            ServiceEntity service = new ServiceEntity();
            service.setNomService(serviceDTO.getNomService());

            // Fetch the Departement entity by id_dep from the serviceDTO
            Departement departement = departementService.getDepartementById(serviceDTO.getId_dep());
            service.setDepartement(departement);

            ServiceEntity newService = serviceService.addService(service);
            return ResponseEntity.ok(newService);
        } catch (Exception e) {
            System.out.println("Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @GetMapping("/all")
    public ResponseEntity<List<ServiceEntity>> getAllServices() {
        System.out.println("Récupération de tous les services");
        List<ServiceEntity> services = serviceService.getAllServices();
        return ResponseEntity.ok(services);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceEntity> getServiceById(@PathVariable Long id) {
        ServiceEntity service = serviceService.getServiceById(id);
        return ResponseEntity.ok(service);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ServiceEntity> updateService(@PathVariable Long id, @RequestBody ServiceDTO serviceDTO) {
        ServiceEntity updatedService = serviceService.updateService(id, serviceDTO);
        return ResponseEntity.ok(updatedService);
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}/utilisateurs")
    public ResponseEntity<List<Utilisateur>> getUtilisateursByServiceId(@PathVariable Long id) {
        List<Utilisateur> utilisateurs = utilisateurService.getUtilisateursByServiceId(id);
        return ResponseEntity.ok(utilisateurs);
    }

}
