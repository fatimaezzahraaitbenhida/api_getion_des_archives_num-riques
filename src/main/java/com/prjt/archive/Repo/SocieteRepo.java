package com.prjt.archive.Repo;

import com.prjt.archive.Entity.Societe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SocieteRepo extends JpaRepository<Societe, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM Societe s WHERE s.nomSociete = :nomSociete")
    boolean existsByNomSociete(String nomSociete);

}
