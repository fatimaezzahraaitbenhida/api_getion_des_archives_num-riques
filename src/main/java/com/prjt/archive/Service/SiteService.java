package com.prjt.archive.Service;


import com.prjt.archive.Dto.DepDTO;
import com.prjt.archive.Dto.SiteDTO;
import com.prjt.archive.Entity.Departement;
import com.prjt.archive.Entity.Site;

import java.util.List;
import java.util.Set;

public interface SiteService {
    Site addSite(Site site);
    List<Site> getAllSites();
    Site getSiteById(Long id);
    Site updateSite(Long id, SiteDTO siteDTO);
    void deleteSite(Long id);
    List<Site> getSitesByServiceId(Long serviceId);
    SiteDTO convertToDTO(Site site);
    String getSocieteNameBySiteId(Long siteId);

    Set<Site> getSitesByIds(Set<Long> siteIds);

    void addDepartementToSite(Long siteId, Long departementId);
}
