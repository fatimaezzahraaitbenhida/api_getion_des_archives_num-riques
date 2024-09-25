package com.prjt.archive.Service.impl;

import com.prjt.archive.Dto.LoginDTO;
import com.prjt.archive.Dto.UtilisateurDTO;
import com.prjt.archive.Entity.ServiceEntity;
import com.prjt.archive.Entity.Site;
import com.prjt.archive.Entity.Utilisateur;
import com.prjt.archive.Repo.DepartementRepo;
import com.prjt.archive.Repo.ServiceRepo;
import com.prjt.archive.Repo.SiteRepo;
import com.prjt.archive.Repo.UtilisateurRepo;
import com.prjt.archive.Service.UtilisateurService;
import com.prjt.archive.response.LoginResponse;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UtilisateurIMPL implements UtilisateurService {

    @Autowired
    private UtilisateurRepo utilisateurRepo;

    @Autowired
    private DepartementRepo departementRepo;
    @Autowired
    private SiteRepo siteRepo;
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UtilisateurDTO utilisateurDTO) {
        if (utilisateurDTO.getGmail() == null || utilisateurDTO.getGmail().isEmpty()) {
            throw new IllegalArgumentException("L'email ne peut pas être nul ou vide.");
        }

        if (utilisateurRepo.existsByEmail(utilisateurDTO.getGmail())) {
            throw new IllegalArgumentException("L'email est déjà utilisé.");
        }

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(utilisateurDTO.getGmail());
        utilisateur.setPrenom(utilisateurDTO.getPrenom());
        utilisateur.setPassword(utilisateurDTO.getPassword()); // Stocker le mot de passe en clair
        utilisateur.setTypeUser(utilisateurDTO.getTypeUser());

        Site site = siteRepo.findById(utilisateurDTO.getSiteId())
                .orElseThrow(() -> new IllegalArgumentException("Site non trouvé"));

        utilisateur.setSite(site);

        utilisateurRepo.save(utilisateur);
        return utilisateur.getEmail();
    }



    @Override
    public List<Utilisateur> lire() {
        List<Utilisateur> utilisateurs = utilisateurRepo.findAll();
        utilisateurs.forEach(utilisateur -> {
            // Initialiser explicitement les collections
            Hibernate.initialize(utilisateur.getDocuments());
        });
        return utilisateurs;}

    @Override
    public String supprimer(Long id) {
        try {
            utilisateurRepo.deleteById(id);
            return "Utilisateur supprimé avec succès";
        } catch (EmptyResultDataAccessException ex) {
            throw new RuntimeException("Utilisateur spécifié n'a pas été trouvé");
        } catch (Exception ex) {
            throw new RuntimeException("Une erreur s'est produite lors de la suppression de l'utilisateur");
        }
    }

    @Override
    public Utilisateur modifier(Long id, UtilisateurDTO utilisateurDTO) {
        return utilisateurRepo.findById(id).map(user -> {
            if (utilisateurDTO.getGmail() != null) {
                user.setEmail(utilisateurDTO.getGmail());
            }
            if (utilisateurDTO.getPrenom() != null) {
                user.setPrenom(utilisateurDTO.getPrenom());
            }
            if (utilisateurDTO.getPassword() != null && !utilisateurDTO.getPassword().isEmpty()) {
                user.setPassword(utilisateurDTO.getPassword()); // Store password in plain text
            }
            if (utilisateurDTO.getSiteId() != null) {
                Site site = siteRepo.findById(utilisateurDTO.getSiteId())
                        .orElseThrow(() -> new IllegalArgumentException("Site non trouvé"));
                user.setSite(site);
            }
            if (utilisateurDTO.getServiceId() != null) {
                ServiceEntity service = serviceRepo.findById(utilisateurDTO.getServiceId())
                        .orElseThrow(() -> new IllegalArgumentException("Service non trouvé"));
                user.setService(service);
            }
            return utilisateurRepo.save(user);
        }).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }


    @Override
    public LoginResponse loginUtilisateur(LoginDTO loginDTO) {
        System.out.println(loginDTO);
        System.out.println("Provided Password: " + loginDTO.getPassword());
        System.out.println("Provided TypeUser: " + loginDTO.getTypeUser());

        // Trouver l'utilisateur par email
        Optional<Utilisateur> foundUser = utilisateurRepo.findByEmail(loginDTO.getEmail());

        if (foundUser.isPresent()) {
            Utilisateur utilisateur = foundUser.get();
            String rawPassword = loginDTO.getPassword(); // Mot de passe en clair
            String storedPassword = utilisateur.getPassword(); // Mot de passe stocké
            System.out.println("Is Type User Correct: " + utilisateur.getTypeUser().equals(loginDTO.getTypeUser()));

            // Comparaison du mot de passe en clair avec le mot de passe stocké
            boolean isPasswordCorrect = rawPassword.equals(storedPassword);

            if (isPasswordCorrect) {
                if (utilisateur.getTypeUser().equalsIgnoreCase(loginDTO.getTypeUser())) {
                    // Return response with the user's first name and ID
                    return new LoginResponse("Login success", true, utilisateur.getPrenom(), utilisateur.getId());
                } else {
                    return new LoginResponse("Type utilisateur incorrect", false, null, null);
                }
            } else {
                return new LoginResponse("Mot de passe incorrect", false, null, null);
            }
        } else {
            return new LoginResponse("Email non trouvé", false, null, null);
        }
    }



    public List<String> getAllEmails() {
        return utilisateurRepo.findAll().stream()
                .map(Utilisateur::getEmail) // Assuming your entity has a getEmail method
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Utilisateur> getUserByEmailAndTypeUser(String email, String typeUser) {
        return utilisateurRepo.findByEmailAndTypeUser(email, typeUser);
    }

    @Override
    public List<Utilisateur> getUtilisateursByServiceId(Long serviceId) {
        return utilisateurRepo.findByServiceId(serviceId);
    }
    public UtilisateurDTO getUtilisateurByEmail(String email) {
        Utilisateur utilisateur = utilisateurRepo.findByEmail(email)
                .orElse(null); // Retourner null si l'utilisateur n'existe pas
        return convertToDTO(utilisateur);
    }



    @Override
    public UtilisateurDTO convertToDTO(Utilisateur utilisateur) {
        UtilisateurDTO utilisateurDTO = new UtilisateurDTO();
        utilisateurDTO.setId(utilisateur.getId());
        utilisateurDTO.setGmail(utilisateur.getEmail());
        utilisateurDTO.setPrenom(utilisateur.getPrenom());
        utilisateurDTO.setPassword(utilisateur.getPassword());
        utilisateurDTO.setTypeUser(utilisateur.getTypeUser());

        // Récupération des IDs de site et service associés, s'ils existent
        Site site = utilisateur.getSite();
        if (site != null) {
            utilisateurDTO.setSiteId(site.getId());
        }

        com.prjt.archive.Entity.ServiceEntity service = utilisateur.getService();
        if (service != null) {
            utilisateurDTO.setServiceId(service.getId_service());
        }

        return utilisateurDTO;
    }

}











