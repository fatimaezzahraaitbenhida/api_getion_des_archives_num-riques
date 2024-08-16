package com.prjt.archive.Dto;

public class UtilisateurDTO {
    private Long id;
    private String gmail;
    private String prenom;
    private String password;
    private String typeUser;
    private Long siteId;
    private Long serviceId;  // Add this field
// Ajouter ce champ

    // Constructeurs
    public UtilisateurDTO() {}


    public UtilisateurDTO(Long id, String gmail, String prenom, String password, String typeUser, Long siteId, Long serviceId) {
        this.id = id;
        this.gmail = gmail;
        this.prenom = prenom;
        this.password = password;
        this.typeUser = typeUser;
        this.siteId = siteId;
        this.serviceId = serviceId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getters et Setters
    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTypeUser() {
        return typeUser;
    }

    public void setTypeUser(String typeUser) {
        this.typeUser = typeUser;
    }

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
}
