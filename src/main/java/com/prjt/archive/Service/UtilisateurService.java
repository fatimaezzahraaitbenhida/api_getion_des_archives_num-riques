package com.prjt.archive.Service;

import com.prjt.archive.Dto.LoginDTO;
import com.prjt.archive.Dto.UtilisateurDTO;
import com.prjt.archive.Entity.Utilisateur; // Remplacez par votre entité Utilisateur
import com.prjt.archive.Repo.UtilisateurRepo; // Remplacez par votre repository
import com.prjt.archive.response.LoginResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UtilisateurService {

    public String addUser(UtilisateurDTO utilisateurDTO);

    public List<Utilisateur> lire();

    public String supprimer(Long id);

    public Utilisateur modifier(Long id, UtilisateurDTO utilisateurDTO);

    LoginResponse loginUtilisateur(LoginDTO loginDTO);

    List<String> getAllEmails();

    Optional<Utilisateur> getUserByEmailAndTypeUser(String email, String typeUser);

    List<Utilisateur> getUtilisateursByServiceId(Long id);

    UtilisateurDTO getUtilisateurByEmail(String email);

    UtilisateurDTO convertToDTO(Utilisateur utilisateur);
}
