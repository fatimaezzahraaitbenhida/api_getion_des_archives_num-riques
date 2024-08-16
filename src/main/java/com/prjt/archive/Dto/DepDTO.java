package com.prjt.archive.Dto;

import java.util.Set;

public class DepDTO {
    private Long id;
    private String nomDepartement;
    private Set<Long> siteIds;  // Identifiants des sites associés
    private Set<Long> serviceIds; // Identifiants des services associés

    public DepDTO(Long id, String nomDepartement, Set<Long> siteIds, Set<Long> serviceIds) {
        this.id = id;
        this.nomDepartement = nomDepartement;
        this.siteIds = siteIds;
        this.serviceIds = serviceIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomDepartement() {
        return nomDepartement;
    }

    public void setNomDepartement(String nomDepartement) {
        this.nomDepartement = nomDepartement;
    }

    public Set<Long> getSiteIds() {
        return siteIds;
    }

    public void setSiteIds(Set<Long> siteIds) {
        this.siteIds = siteIds;
    }

    public Set<Long> getServiceIds() {
        return serviceIds;
    }

    public void setServiceIds(Set<Long> serviceIds) {
        this.serviceIds = serviceIds;
    }
    public DepDTO(){

    }
}
