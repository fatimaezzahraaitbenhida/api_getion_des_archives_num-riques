package com.prjt.archive.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Departement {
    @Id
    @Column(name = "id_dep")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_dep;

    @Column(name = "nom_dep", length = 255, unique = true)
    private String nomDep;

    @ManyToMany(mappedBy = "departements")
    @JsonIgnore
    private Set<Site> sites;

    @OneToMany(mappedBy = "departement")
    @JsonIgnore
    private Set<ServiceEntity> services;

    public Departement() {}

    public Departement(Long id_dep, String nomDep, Set<Site> sites) {
        this.id_dep = id_dep;
        this.nomDep = nomDep;
        this.sites = sites;
    }

    public Long getId_dep() {
        return id_dep;
    }

    public void setId_dep(Long id_dep) {
        this.id_dep = id_dep;
    }

    public String getNomDep() {
        return nomDep;
    }

    public void setNomDep(String nomDep) {
        this.nomDep = nomDep;
    }

    public Set<Site> getSites() {
        return sites;
    }

    public void setSites(Set<Site> sites) {
        this.sites = sites;
    }


}
