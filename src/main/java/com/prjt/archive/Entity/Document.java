package com.prjt.archive.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_doc")
    private Long id_doc;

    @Column(name = "nom", length = 255, unique = true)
    private String nom;

    @Column(name = "date_creation")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date date_creation;

    @Column(name = "type_doc", length = 255)
    private String type_doc;

    @Column(name = "chemin", length = 255)
    private String chemin;

    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonBackReference // Indique que c'est la référence inverse
    private Utilisateur user;

    public Document() {}

    public Long getId_doc() {
        return id_doc;
    }

    public void setId_doc(Long id_doc) {
        this.id_doc = id_doc;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Date getDate_creation() {
        return date_creation;
    }

    public void setDate_creation(Date date_creation) {
        this.date_creation = date_creation;
    }

    public String getType_doc() {
        return type_doc;
    }

    public void setType_doc(String type_doc) {
        this.type_doc = type_doc;
    }

    public String getChemin() {
        return chemin;
    }
    public String getUserEmail() {
        return user != null ? user.getEmail() : null;
    }
    public void setChemin(String chemin) {
        this.chemin = chemin;
    }

    public Utilisateur getUser() {
        return user;
    }

    public void setUser(Utilisateur user) {
        this.user = user;
    }
    public static String extractFileIdFromUrl(String fileUrl) {
        String[] parts = fileUrl.split("id=");
        if (parts.length > 1) {
            // L'ID est le premier élément après `id=`, et peut être suivi par d'autres paramètres
            String idPart = parts[1];
            // Séparation par le caractère `&` si d'autres paramètres sont présents
            int endIndex = idPart.indexOf('&');
            if (endIndex > -1) {
                return idPart.substring(0, endIndex);
            }
            return idPart; // Cas où l'ID est le dernier paramètre
        }
        return null;
    }



}