package com.prjt.archive.response;

public class LoginResponse {
    private String message;
    private boolean status;
    private String prenom;
    private Long id;// Ajoutez ce champ

    public LoginResponse(String message, boolean status, String prenom, Long id) {
        this.message = message;
        this.status = status;
        this.prenom = prenom;
        this.id = id;
    }

    // Getters et Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
}
