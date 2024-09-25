package com.prjt.archive.Controller;

import com.prjt.archive.Dto.DepDTO;
import com.prjt.archive.Entity.Departement;
import com.prjt.archive.Entity.ServiceEntity;
import com.prjt.archive.Entity.Site;
import com.prjt.archive.Service.DepService;
import com.prjt.archive.Service.ServiceService;
import com.prjt.archive.Service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/departement")
public class DepController {

    @Autowired
    private DepService departementService;

    @Autowired
    private ServiceService serviceService;
    @Autowired
    private SiteService siteService;

    @PostMapping("/add")
    public ResponseEntity<Long> addDepartement(@RequestBody DepDTO departementDTO) {
        System.out.println("Données reçues : " + departementDTO);
        try {
            Departement departement = new Departement();
            departement.setNomDep(departementDTO.getNomDepartement());

            if (departementDTO.getSiteIds() != null) {
                Set<Site> sites = siteService.getSitesByIds(departementDTO.getSiteIds());
                departement.setSites(sites);
            }

            Departement newDepartement = departementService.addDepartement(departement);
            return ResponseEntity.ok(newDepartement.getId_dep()); // Return the department ID
        } catch (Exception e) {
            System.out.println("Erreur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<Departement>> getAllDepartements() {
        System.out.println("Récupération de tous les departements");
        List<Departement> departements = departementService.getAllDepartements();
        return ResponseEntity.ok(departements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departement> getDepartementById(@PathVariable Long id) {
        Departement departement = departementService.getDepartementById(id);
        return ResponseEntity.ok(departement);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Departement> updateDepartement(@PathVariable Long id, @RequestBody DepDTO depDTO) {
        Departement updatedDep = departementService.updateDepartement(id, depDTO);
        return ResponseEntity.ok(updatedDep);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDepartement(@PathVariable Long id) {
        departementService.deleteDepartement(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}/services")
    public ResponseEntity<List<ServiceEntity>> getServicesByDepartementId(@PathVariable Long id) {
        List<ServiceEntity> services = serviceService.getServicesByDepartementId(id);
        return ResponseEntity.ok(services);
    }



}