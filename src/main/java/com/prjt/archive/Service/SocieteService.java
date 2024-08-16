package com.prjt.archive.Service;

import com.prjt.archive.Dto.SocieteDTO;
import com.prjt.archive.Entity.Societe;

import java.util.List;

public interface SocieteService {
    Societe addSociete(Societe societe);
    List<Societe> getAllSocietes();
    Societe getSocieteById(Long id);
    Societe updateSociete(Long id, SocieteDTO societeDTO);
    void deleteSociete(Long id);
}
