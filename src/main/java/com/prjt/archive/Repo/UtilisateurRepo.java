package com.prjt.archive.Repo;

import com.prjt.archive.Entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByIdAndTypeUser(Long id, String typeUser);
    Optional<Utilisateur> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Utilisateur> findByEmailAndTypeUser(String email, String typeUser);
    Optional<Utilisateur> findOneByEmailAndPassword(String email,String password);


    @Query("SELECT u FROM Utilisateur u WHERE u.service.id_service = :serviceId")
    List<Utilisateur> findByServiceId(@Param("serviceId") Long serviceId);
}
