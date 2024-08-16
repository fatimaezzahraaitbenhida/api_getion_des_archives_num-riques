package com.prjt.archive.Repo;

import com.prjt.archive.Entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM Document s WHERE s.nom = :nom")
    boolean existsByNom(String nom);

    List<Document> findByUserId(Long utilisateurId);
    @Query("SELECT d FROM Document d WHERE d.type_doc = :type AND d.user.email = :email")
    List<Document> findByTypeAndEmail(@Param("type") String type, @Param("email") String email);
    @Query("SELECT s.nomSite FROM Site s WHERE s.id = :siteId")
    String findSocieteNameBySiteId(@Param("siteId") Long siteId);

}
