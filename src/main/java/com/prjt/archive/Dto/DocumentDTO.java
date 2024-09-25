package com.prjt.archive.Dto;


import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class DocumentDTO {
    private Long idDoc;
    private String nom;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateCreation;
    private String typeDoc;
    private String chemin;
    private Long employeId;
    private String siteName;
    private String userEmail; // Ajout du champ pour l'email
    private String serviceName;
    public DocumentDTO(Long idDoc, String nom, Date dateCreation, String typeDoc, String chemin, Long employeId, String serviceName) {
        this.idDoc = idDoc;
        this.nom = nom;
        this.dateCreation = dateCreation;
        this.typeDoc = typeDoc;
        this.chemin = chemin;
        this.employeId = employeId;
        this.serviceName = serviceName;
    }
    public DocumentDTO(String serviceName) {
        this.serviceName = serviceName;
    }

    public DocumentDTO() {

    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public Long getIdDoc() {
        return idDoc;
    }

    public void setIdDoc(Long idDoc) {
        this.idDoc = idDoc;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public String getTypeDoc() {
        return typeDoc;
    }

    public void setTypeDoc(String typeDoc) {
        this.typeDoc = typeDoc;
    }


    public String getChemin() {
        return chemin;
    }

    public void setChemin(String chemin) {
        this.chemin = chemin;
    }


    public Long getEmployeId() {
        return employeId;
    }

    public void setEmployeId(Long employeId) {
        this.employeId = employeId;
    }



    // Getters et setters
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }


    public String getServiceName() {
        return serviceName;
    }
}