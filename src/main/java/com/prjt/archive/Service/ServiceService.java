package com.prjt.archive.Service;

import com.prjt.archive.Dto.ServiceDTO;
import com.prjt.archive.Entity.ServiceEntity;

import java.util.List;

public interface ServiceService {
    ServiceEntity addService(ServiceEntity service);
    List<ServiceEntity> getAllServices();
    ServiceEntity getServiceById(Long id);
    ServiceEntity updateService(Long id, ServiceDTO serviceDTO);
    void deleteService(Long id);

    List<ServiceEntity> getServicesByDepartementId(Long id);
}
