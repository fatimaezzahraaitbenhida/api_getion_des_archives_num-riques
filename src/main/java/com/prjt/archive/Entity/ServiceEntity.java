package com.prjt.archive.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class ServiceEntity {
    @Id
    @Column(name = "id_service")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_service;

    @Column(name = "nom_service", length = 255, unique = true)
    private String nomService;

    @ManyToOne
    @JoinColumn(name = "id_dep", nullable = false)
    private Departement departement;

    @JsonBackReference
    @OneToMany(mappedBy = "service")
    private Set<Utilisateur> utilisateurs;

    @ManyToMany(mappedBy = "services")
    private Set<Site> sites;

    public Long getId_service() {
        return id_service;
    }

    public void setId_service(Long id_service) {
        this.id_service = id_service;
    }

    public String getNomService() {
        return nomService;
    }

    public void setNomService(String nomService) {
        this.nomService = nomService;
    }

    public Departement getDepartement() {
        return departement;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }

    public Set<Utilisateur> getUtilisateurs() {
        return utilisateurs;
    }

    public void setUtilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
    }

    public Set<Site> getSites() {
        return sites;
    }

    public void setSites(Set<Site> sites) {
        this.sites = sites;
    }
}
