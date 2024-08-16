package com.prjt.archive.Repo;

import com.prjt.archive.Entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface SiteRepo extends JpaRepository<Site, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM Site s WHERE s.nomSite = :nomSite")
    boolean existsByNomSite(String nomSite);
    @Query("SELECT s FROM Site s JOIN s.departements d JOIN d.services ser WHERE ser.id_service = :serviceId")
    List<Site> findByServiceId(@Param("serviceId") Long serviceId);


}
