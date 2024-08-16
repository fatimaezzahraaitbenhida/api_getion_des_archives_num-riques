package com.prjt.archive.Repo;

import com.prjt.archive.Entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceRepo extends JpaRepository<ServiceEntity, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM ServiceEntity s WHERE s.nomService = :nomService")
    boolean existsByNomService(String nomService);
    @Query("SELECT s FROM ServiceEntity s WHERE s.departement.id_dep = :departementId")
    List<ServiceEntity> findByDepartementId(@Param("departementId") Long departementId);
}
