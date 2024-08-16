package com.prjt.archive.Repo;

import com.prjt.archive.Entity.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartementRepo extends    JpaRepository<Departement, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM Departement s WHERE s.nomDep = :nomDep")
    boolean existsByNomDep(String nomDep);
    @Query("SELECT d FROM Departement d ORDER BY d.id_dep ASC")
    List<Departement> findAllOrderByIdAsc();
    @Query("SELECT d FROM Departement d JOIN d.sites s WHERE s.id = :siteId")
    List<Departement> findBySitesId(@Param("siteId") Long siteId);

}