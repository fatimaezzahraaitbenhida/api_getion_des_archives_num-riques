package com.prjt.archive.Service.impl;

import com.prjt.archive.Dto.ServiceDTO;
import com.prjt.archive.Entity.Departement;
import com.prjt.archive.Entity.ServiceEntity;
import com.prjt.archive.Entity.Utilisateur;
import com.prjt.archive.Repo.DepartementRepo;
import com.prjt.archive.Repo.ServiceRepo;
import com.prjt.archive.Repo.UtilisateurRepo;
import com.prjt.archive.Service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceIMPL implements ServiceService {
    @Autowired
    private ServiceRepo serviceRepository;
    @Autowired
    private DepartementRepo departementRepo;
    @Autowired
    private UtilisateurRepo utilisateurRepository;

    @Override
    public ServiceEntity addService(ServiceEntity service) {
        // Vérification des champs nuls avant de sauvegarder
        if (service.getNomService() == null || service.getNomService().isEmpty()) {
            throw new IllegalArgumentException("Le nom du service ne peut pas être nul.");
        }
        if (serviceRepository.existsByNomService(service.getNomService())) {
            throw new IllegalArgumentException("Le nom du service doit être unique.");
        }
        return serviceRepository.save(service);
    }

    @Override
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }
    public List<ServiceEntity> getServicesByDepartementId(Long departementId) {
        return serviceRepository.findByDepartementId(departementId);
    }
    public List<Utilisateur> getUtilisateursByServiceId(Long serviceId) {
        return utilisateurRepository.findByServiceId(serviceId);
    }




    @Override
    public ServiceEntity getServiceById(Long id) {
        Optional<ServiceEntity> service = serviceRepository.findById(id);
        return service.orElseThrow(() -> new IllegalArgumentException("Service non trouvé pour l'ID: " + id));
    }

    @Override
    public ServiceEntity updateService(Long id, ServiceDTO serviceDTO) {
        Optional<ServiceEntity> serviceOptional = serviceRepository.findById(id);
        if (serviceOptional.isPresent()) {
            ServiceEntity service = serviceOptional.get();

            // Check if another service with the same name exists, excluding the current service
            if (serviceRepository.existsByNomServiceAndIdNot(serviceDTO.getNomService(), id)) {
                throw new IllegalArgumentException("Le nom du service doit être unique.");
            }

            service.setNomService(serviceDTO.getNomService());

            // Update the department
            Departement departement = departementRepo.findById(serviceDTO.getId_dep())
                    .orElseThrow(() -> new RuntimeException("Département non trouvé avec l'ID : " + serviceDTO.getId_dep()));
            service.setDepartement(departement);

            return serviceRepository.save(service);
        } else {
            throw new RuntimeException("Service non trouvé avec l'ID : " + id);
        }
    }




    @Override
    public void deleteService(Long id) {
        ServiceEntity service = getServiceById(id);
        serviceRepository.delete(service);
    }
}
