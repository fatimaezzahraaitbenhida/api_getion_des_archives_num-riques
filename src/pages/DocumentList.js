import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [demandeStatuts, setDemandeStatuts] = useState([]);
    const [sites, setSites] = useState({}); // Mapping site names to their societe names
    const [departements, setDepartements] = useState({}); // Mapping service names to their department names
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const fetchDocuments = async () => {
        try {
            // Fetch documents
            const docResponse = await axios.get('http://localhost:8100/api/doc/read');
            const docs = docResponse.data;
            setDocuments(docs);

            // Fetch all demande statuses
            const demandeResponse = await axios.get('http://localhost:8100/api/demande/all');
            const demandes = demandeResponse.data;
            setDemandeStatuts(demandes);

            // Fetch all sites
            const siteResponse = await axios.get('http://localhost:8100/api/site/all');
            const sitesData = siteResponse.data;

            // Fetch all societies
            const societeResponse = await axios.get('http://localhost:8100/api/societe/all');
            const societesData = societeResponse.data;
            const societesMap = societesData.reduce((acc, societe) => {
                acc[societe.id] = societe.nomSociete;
                return acc;
            }, {});

            // Map site names to societe names
            const sitesMap = sitesData.reduce((acc, site) => {
                acc[site.nomSite] = societesMap[site.societeId] || 'Non spécifié';
                return acc;
            }, {});
            setSites(sitesMap);

            // Fetch all services with their associated departments
            const serviceResponse = await axios.get('http://localhost:8100/api/service/all');
            const servicesData = serviceResponse.data;
            const departementMap = servicesData.reduce((acc, service) => {
                acc[service.nomService] = service.departement.nomDep;
                return acc;
            }, {});
            setDepartements(departementMap);

            // Log the fetched data for debugging
            console.log('Fetched Documents:', docs);
            console.log('Demande Statuts:', demandes);
            console.log('Sites Map:', sitesMap);
            console.log('Departements Map:', departementMap);

        } catch (error) {
            console.error('Error fetching documents, demandes, or other data:', error);
        }
    };

    useEffect(() => {
        fetchDocuments();

        // Retrieve userId from URL query params
        const queryParams = new URLSearchParams(location.search);
        const userIdParam = queryParams.get('userId');
        setUserId(userIdParam || '');
        console.log('User ID from URL:', userIdParam);
    }, [location.search]);

    const handleRequestAuthorization = async (doc) => {
        try {
            const userIdParam = userId; // ID de l'utilisateur demandeur
            const documentId = doc.idDoc; // ID du document pour lequel l'autorisation est demandée
    
            await axios.post('http://localhost:8100/api/demande/create', null, {
                params: {
                    userId: userIdParam,
                    documentId: documentId
                }
            });
            alert('Demande envoyée avec succès');
            // Refresh documents to update the status
            fetchDocuments();
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la demande d\'autorisation:', error);
        }
    };

    const getRequestStatus = (documentId) => {
        const demande = demandeStatuts.find(d => d.documentId === documentId);
        return demande ? demande.statut : 'Pas de demande';
    };

    const getDocumentPath = (documentId) => {
        const doc = documents.find(d => d.idDoc === documentId);
        return doc ? doc.chemin : ''; // Assuming 'chemin' is the field name for the document path
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom du Document</th>
                        <th>Email de l'Utilisateur</th>
                        <th>Date de Création</th>
                        <th>Type de Document</th>
                        <th>ID Employé</th>
                        <th>Nom du Site</th>
                        <th>Nom du Service</th>
                        <th>Nom du Département</th>
                        <th>Nom de la Société</th>
                        <th>Nom du Document</th>
                        <th>Statut de la Demande</th> {/* Added column for request status */}
                        <th>Voir Document</th> {/* Changed column title */}
                        <th>Demander Autorisation</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map(doc => (
                        <tr key={doc.idDoc}>
                            <td>{doc.idDoc}</td>
                            <td>{doc.nom}</td>
                            <td>{doc.userEmail || 'Non spécifié'}</td>
                            <td>{new Date(doc.dateCreation).toLocaleDateString()}</td>
                            <td>{doc.typeDoc}</td>
                            <td>{doc.employeId || 'Non spécifié'}</td>
                            <td>{doc.siteName || 'Non spécifié'}</td>
                            <td>{doc.serviceName || 'Non spécifié'}</td>
                            <td>{departements[doc.serviceName] || 'Non spécifié'}</td>
                            <td>{sites[doc.siteName] || 'Non spécifié'}</td>
                            <td>{doc.nom || 'Non spécifié'}</td>
                            <td>{getRequestStatus(doc.idDoc)}</td> {/* Display request status */}
                            <td>
                                {getRequestStatus(doc.idDoc) === 'Autorisé' ? (
                                    <a href={getDocumentPath(doc.idDoc)} target="_blank" rel="noopener noreferrer">
                                        Voir Document
                                    </a>
                                ) : (
                                    'Non autorisé'
                                )}
                            </td> {/* Display link to document if authorized */}
                            <td>
                                <RequestButton onClick={() => handleRequestAuthorization(doc)}>
                                    Demander Autorisation
                                </RequestButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <FloatingButton onClick={() => navigate('/home3')}>
                Retour en Arrière
            </FloatingButton>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    padding: 20px;
    background: #f5f5f7;
    font-family: 'Montserrat', sans-serif;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 15px rgba(64, 64, 64, .7);
    border-radius: 12px 12px 0 0;
    overflow: hidden;

    th {
        background-color: #679F5A;
        color: #fafafa;
        padding: 15px;
        text-align: center;
    }

    td {
        padding: 15px;
        text-align: center;
    }

    tr:nth-child(even) {
        background-color: #eeeeee;
    }
`;

const RequestButton = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }

    &:focus {
        outline: none;
    }
`;

const FloatingButton = styled.button`
    border-radius: 26.5px;
    background-color: #ddd1bc;
    border: 1px solid #f3f6f7;
    box-shadow: 0 16px 22px -17px #00ccff;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    line-height: 20px;
    padding: 12px 20px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;

    &:hover {
        background-color: #ddd1bc;
        color: #e9ecf1;
    }

    &:focus {
        outline: none;
    }
`;

export default DocumentList;
