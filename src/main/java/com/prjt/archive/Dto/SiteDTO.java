package com.prjt.archive.Dto;

import java.util.Set;

public class SiteDTO {
    private Long id;  // Identifiant du site
    private String nomSite;
    private Long departementId;  // Identifiant du département associé
    private Long societeId;
    private Set<Long> serviceIds; // Identifiant de la société associée
    // Constructeurs
    public SiteDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomSite() {
        return nomSite;
    }

    public void setNomSite(String nomSite) {
        this.nomSite = nomSite;
    }

    public Long getDepartementId() {
        return departementId;
    }

    public void setDepartementId(Long departementId) {
        this.departementId = departementId;
    }

    public Long getSocieteId() {
        return societeId;
    }

    public void setSocieteId(Long societeId) {
        this.societeId = societeId;
    }

    public Set<Long> getServiceIds() {
        return serviceIds;
    }

    public void setServiceIds(Set<Long> serviceIds) {
        this.serviceIds = serviceIds;
    }
}

