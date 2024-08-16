package com.prjt.archive.Repo;

import com.prjt.archive.Entity.DemandeAutorisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeAutorisationRepository extends JpaRepository<DemandeAutorisation, Long> {


    List<DemandeAutorisation> findByUtilisateurId(Long employeId);
}
