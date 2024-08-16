import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/hierarchy.css'; // Ensure this CSS file exists

const TreeView = () => {
    const [societes, setSocietes] = useState([]);
    const [sites, setSites] = useState({});
    const [departements, setDepartements] = useState({});
    const [services, setServices] = useState({});
    const [utilisateurs, setUtilisateurs] = useState({});
    const [documents, setDocuments] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedNodes, setExpandedNodes] = useState({});
    const [expandedDepartements, setExpandedDepartements] = useState({});
    const [expandedServices, setExpandedServices] = useState({});
    const [expandedUtilisateurs, setExpandedUtilisateurs] = useState({});

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8100/api/societe/all')
            .then(response => setSocietes(response.data))
            .catch(error => console.error('Erreur lors de la récupération des Sociétés:', error))
            .finally(() => setLoading(false));
    }, []);

    const handleSocieteClick = (societeId) => {
        if (!sites[societeId]) {
            axios.get('http://localhost:8100/api/site/all')
                .then(response => {
                    const filteredSites = response.data.filter(site => site.societeId === societeId);
                    setSites(prev => ({ ...prev, [societeId]: filteredSites }));
                })
                .catch(error => console.error('Erreur lors de la récupération des Sites:', error));
        }
        toggleNode(societeId, 'societe');
    };

    const handleSiteClick = (siteId) => {
        if (!departements[siteId] || !services[siteId]) {
            axios.all([
                axios.get(`http://localhost:8100/api/site/${siteId}/departements`),
                axios.get(`http://localhost:8100/api/site/${siteId}/services`)
            ])
            .then(axios.spread((departementResponse, serviceResponse) => {
                setDepartements(prev => ({ ...prev, [siteId]: departementResponse.data }));
                setServices(prev => ({ ...prev, [siteId]: serviceResponse.data }));
            }))
            .catch(error => console.error('Erreur lors de la récupération des Départements ou Services:', error));
        }
        toggleNode(siteId, 'site');
    };

    const handleDepartementClick = (siteId, departementId) => {
        if (!services[`${siteId}-${departementId}`]) {
            axios.get(`http://localhost:8100/api/departement/${departementId}/services`)
                .then(response => setServices(prev => ({ ...prev, [`${siteId}-${departementId}`]: response.data })))
                .catch(error => console.error('Erreur lors de la récupération des Services:', error));
        }
        toggleDepartementNode(siteId, departementId);
    };

    const handleServiceClick = (siteId, departementId, serviceId) => {
        if (!utilisateurs[`${siteId}-${departementId}-${serviceId}`]) {
            axios.get(`http://localhost:8100/api/service/${serviceId}/utilisateurs`)
                .then(response => {
                    console.log(`Utilisateurs pour le service ${serviceId}:`, response.data);
                    setUtilisateurs(prev => ({ ...prev, [`${siteId}-${departementId}-${serviceId}`]: response.data }));
                })
                .catch(error => console.error('Erreur lors de la récupération des Utilisateurs:', error));
        }
        toggleServiceNode(siteId, departementId, serviceId);
    };

    const handleUtilisateurClick = (utilisateurId) => {
        if (!documents[utilisateurId]) {
            axios.get(`http://localhost:8100/api/utilisateur/${utilisateurId}/documents`)
                .then(response => setDocuments(prev => ({ ...prev, [utilisateurId]: response.data })))
                .catch(error => console.error('Erreur lors de la récupération des Documents:', error));
        }
        toggleUtilisateurNode(utilisateurId);
    };

    const toggleNode = (nodeId, level) => {
        setExpandedNodes(prev => ({
            ...prev,
            [`${level}-${nodeId}`]: !prev[`${level}-${nodeId}`]
        }));
    };

    const toggleDepartementNode = (siteId, departementId) => {
        setExpandedDepartements(prev => ({
            ...prev,
            [`${siteId}-departement-${departementId}`]: !prev[`${siteId}-departement-${departementId}`]
        }));
    };

    const toggleServiceNode = (siteId, departementId, serviceId) => {
        setExpandedServices(prev => ({
            ...prev,
            [`${siteId}-${departementId}-service-${serviceId}`]: !prev[`${siteId}-${departementId}-service-${serviceId}`]
        }));
    };

    const toggleUtilisateurNode = (utilisateurId) => {
        setExpandedUtilisateurs(prev => ({
            ...prev,
            [`utilisateur-${utilisateurId}`]: !prev[`utilisateur-${utilisateurId}`]
        }));
    };

    const filteredSocietes = societes.filter(societe =>
        societe.nomSociete.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-container">
            <div className="tree-view">
                {loading ? (
                    <p>Chargement des données...</p>
                ) : (
                    <div className="tree-view-content">
                        <input
                            type="text"
                            placeholder="Rechercher une société..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <div className="societe-list">
                            <ul>
                                {filteredSocietes.map(societe => (
                                    <li key={`societe-${societe.id}`} className="list-item">
                                        <button
                                            className={`toggle-button ${expandedNodes[`societe-${societe.id}`] ? 'minus' : 'plus'}`}
                                            onClick={() => handleSocieteClick(societe.id)}
                                        >
                                            {expandedNodes[`societe-${societe.id}`] ? '-' : '+'}
                                        </button>
                                        <span className="list-button">
                                            {societe.nomSociete}
                                        </span>
                                        {expandedNodes[`societe-${societe.id}`] && (
                                            <ul className="site-list">
                                                {(sites[societe.id] || []).map(site => (
                                                    <li key={`site-${site.id}`} className="list-item">
                                                        <button
                                                            className={`toggle-button ${expandedNodes[`site-${site.id}`] ? 'minus' : 'plus'}`}
                                                            onClick={() => handleSiteClick(site.id)}
                                                        >
                                                            {expandedNodes[`site-${site.id}`] ? '-' : '+'}
                                                        </button>
                                                        <span className="list-button">
                                                            {site.nomSite}
                                                        </span>
                                                        {expandedNodes[`site-${site.id}`] && (
                                                            <>
                                                                <ul className="departement-list">
                                                                    {(departements[site.id] || []).map(departement => (
                                                                        <li key={`departement-${departement.id_dep}`} className="list-item department-item">
                                                                            <button
                                                                                className={`toggle-button ${expandedDepartements[`${site.id}-departement-${departement.id_dep}`] ? 'minus' : 'plus'}`}
                                                                                onClick={() => handleDepartementClick(site.id, departement.id_dep)}
                                                                            >
                                                                                {expandedDepartements[`${site.id}-departement-${departement.id_dep}`] ? '-' : '+'}
                                                                            </button>
                                                                            <span className="list-button">
                                                                                {departement.nomDep}
                                                                            </span>
                                                                            {expandedDepartements[`${site.id}-departement-${departement.id_dep}`] && (
                                                                                <ul className="service-list">
                                                                                    {(services[site.id] || []).filter(service => service.departmentId === departement.id_dep).map(service => (
                                                                                        <li key={`service-${service.id}`} className="list-item service-item">
                                                                                            <button
                                                                                                className={`toggle-button ${expandedServices[`${site.id}-${departement.id_dep}-service-${service.id}`] ? 'minus' : 'plus'}`}
                                                                                                onClick={() => handleServiceClick(site.id, departement.id_dep, service.id)}
                                                                                            >
                                                                                                {expandedServices[`${site.id}-${departement.id_dep}-service-${service.id}`] ? '-' : '+'}
                                                                                            </button>
                                                                                            <span className="list-button">
                                                                                                {service.nomService}
                                                                                            </span>
                                                                                            {expandedServices[`${site.id}-${departement.id_dep}-service-${service.id}`] && (
                                                                                                <ul className="utilisateur-list">
                                                                                                    {(utilisateurs[`${site.id}-${departement.id_dep}-${service.id}`] || []).map(utilisateur => (
                                                                                                        <li key={`utilisateur-${utilisateur.id}`} className="list-item utilisateur-item">
                                                                                                            <button
                                                                                                                className={`toggle-button ${expandedUtilisateurs[`utilisateur-${utilisateur.id}`] ? 'minus' : 'plus'}`}
                                                                                                                onClick={() => handleUtilisateurClick(utilisateur.id)}
                                                                                                            >
                                                                                                                {expandedUtilisateurs[`utilisateur-${utilisateur.id}`] ? '-' : '+'}
                                                                                                            </button>
                                                                                                            <span className="list-button">
                                                                                                                {utilisateur.email}
                                                                                                            </span>
                                                                                                            {expandedUtilisateurs[`utilisateur-${utilisateur.id}`] && (
                                                                                                                <ul className="document-list">
                                                                                                                    {(documents[utilisateur.id] || []).map(document => (
                                                                                                                        <li key={`document-${document.id}`} className="document-item">
                                                                                                                          
                                                                                                                            <a href={document.chemin} target="_blank" rel="noopener noreferrer">Voir Document</a>
                                                                                                                        </li>
                                                                                                                    ))}
                                                                                                                </ul>
                                                                                                            )}
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            )}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TreeView;
