package com.prjt.archive.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Site {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_site")
    private Long id;

    @Column(name = "nom_site", length = 255, unique = true)
    private String nomSite;

    @ManyToOne
    @JoinColumn(name = "societe_id", nullable = false)
    @JsonIgnore
    private Societe societe;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "site_departement",
            joinColumns = @JoinColumn(name = "site_id"),
            inverseJoinColumns = @JoinColumn(name = "departement_id")
    )
    @JsonIgnore
    private Set<Departement> departements;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "site_service",
            joinColumns = @JoinColumn(name = "site_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    @JsonIgnore
    private Set<ServiceEntity> services;

    @OneToMany(mappedBy = "site")
    @JsonBackReference
    private Set<Utilisateur> usr;

    // No-args constructor
    public Site() {}

    // All-args constructor
    public Site(Long id, String nomSite, Societe societe, Set<Departement> departements, Set<ServiceEntity> services, Set<Utilisateur> usr) {
        this.id = id;
        this.nomSite = nomSite;
        this.societe = societe;
        this.departements = departements;
        this.services = services;
        this.usr = usr;
    }

    // Getters and Setters
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

    public Societe getSociete() {
        return societe;
    }

    public void setSociete(Societe societe) {
        this.societe = societe;
    }

    public Set<Departement> getDepartements() {
        return departements;
    }

    public void setDepartements(Set<Departement> departements) {
        this.departements = departements;
    }

    public Set<ServiceEntity> getServices() {
        return services;
    }

    public void setServices(Set<ServiceEntity> services) {
        this.services = services;
    }

    public Set<Utilisateur> getUsr() {
        return usr;
    }

    public void setUsr(Set<Utilisateur> usr) {
        this.usr = usr;
    }
    public void addDepartement(Departement departement) {
        this.departements.add(departement);
        departement.getSites().add(this);
    }

}
