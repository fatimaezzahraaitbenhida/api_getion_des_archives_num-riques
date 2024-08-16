package com.prjt.archive.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceDTO {
    private Long id;
    private String nomService;
    @JsonProperty("departmentId") // Update this annotation to match JSON field name
    private Long id_dep;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId_dep() {
        return id_dep;
    }

    public void setId_dep(Long id_dep) {
        this.id_dep = id_dep;
    }

    public String getNomService() {
        return nomService;
    }

    public void setNomService(String nomService) {
        this.nomService = nomService;
    }}
