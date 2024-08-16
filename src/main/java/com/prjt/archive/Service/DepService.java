package com.prjt.archive.Service;

import com.prjt.archive.Dto.DepDTO;
import com.prjt.archive.Entity.Departement;

import java.util.List;


public interface DepService {
    Departement addDepartement(Departement departement);
    List<Departement> getAllDepartements();
    Departement getDepartementById(Long id);
    Departement updateDepartement(Long id, DepDTO depDTO);


    void deleteDepartement(Long id);

    List<Departement> getDepartementsBySiteId(Long siteId);
}
