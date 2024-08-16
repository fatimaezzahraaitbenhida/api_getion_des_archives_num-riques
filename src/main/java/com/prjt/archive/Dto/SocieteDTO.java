package com.prjt.archive.Dto;


import java.util.Set;

public class SocieteDTO {
    private Long id;  // Identifiant de la société
    private String nomSociete;
    private Set<Long> siteIds;
    // Constructeurs
    public SocieteDTO() {
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomSociete() {
        return nomSociete;
    }

    public void setNomSociete(String nomSociete) {
        this.nomSociete = nomSociete;
    }
}