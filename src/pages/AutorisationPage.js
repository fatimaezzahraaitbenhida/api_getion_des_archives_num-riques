import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AutorisationPage = () => {
    const [autorisationData, setAutorisationData] = useState([]);
    const [services, setServices] = useState([]);
    const [sites, setSites] = useState([]);
    const [societes, setSocietes] = useState([]);
    const [departements, setDepartements] = useState([]);
    const [documentData, setDocumentData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [demandeResponse, serviceResponse, siteResponse, societeResponse, departementResponse] = await Promise.all([
                    axios.get('http://localhost:8100/api/demande/all'),
                    axios.get('http://localhost:8100/api/service/all'),
                    axios.get('http://localhost:8100/api/site/all'),
                    axios.get('http://localhost:8100/api/societe/all'),
                    axios.get('http://localhost:8100/api/departement/all')
                ]);

                setAutorisationData(demandeResponse.data);
                setServices(serviceResponse.data);
                setSites(siteResponse.data);
                setSocietes(societeResponse.data);
                setDepartements(departementResponse.data);

                const documentIds = demandeResponse.data
                    .filter(data => data.documentId)
                    .map(data => data.documentId);

                if (documentIds.length > 0) {
                    const documentResponses = await Promise.all(
                        documentIds.map(id => axios.get(`http://localhost:8100/api/doc/read/${id}`))
                    );

                    const documents = documentResponses.reduce((acc, response, index) => {
                        acc[documentIds[index]] = {
                            chemin: response.data.chemin,
                            nom: response.data.nom // Assuming the document name is stored in `response.data.nom`
                        };
                        return acc;
                    }, {});

                    setDocumentData(documents);
                }

            } catch (error) {
                setError('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const findServiceById = (id) => {
        const service = services.find(service => service.id_service === id);
        return service ? service.nomService : 'N/A';
    };

    const findSocieteBySiteId = (siteId) => {
        const site = sites.find(site => site.id === siteId);
        if (site) {
            const societe = societes.find(societe => societe.id === site.societeId);
            return societe ? societe.nomSociete : 'N/A';
        }
        return 'N/A';
    };

    const findDepartementByServiceId = (serviceId) => {
        const service = services.find(service => service.id_service === serviceId);
        if (service) {
            const departement = departements.find(dep => dep.id === service.departementId);
            return departement ? departement.nomDep : 'N/A';
        }
        return 'N/A';
    };

    const handleAccept = async (id) => {
        try {
            await axios.put(`http://localhost:8100/api/demande/update/${id}`, {
                statut: 'Autorisé'
            });
            // Refresh data after update
            const response = await axios.get('http://localhost:8100/api/demande/all');
            setAutorisationData(response.data);
            alert("Autorisation accés avec succés");
        } catch (error) {
            console.error('Erreur lors de l\'acceptation de la demande:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`http://localhost:8100/api/demande/update/${id}`, {
                statut: 'Refusé'
            });
            // Refresh data after update
            const response = await axios.get('http://localhost:8100/api/demande/all');
            setAutorisationData(response.data);
            alert("Refus accés avec succés");
        } catch (error) {
            console.error('Erreur lors du refus de la demande:', error);
        }
    };

    return (
        <Container>
            <Title>Traitement des Autorisations</Title>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th>ID du Demandeur</th>
                            <th>Nom du Demandeur</th>
                            <th>Type de Demandeur</th>
                            <th>Société</th>
                            <th>Site</th>
                            <th>Département</th>
                            <th>Service</th>
                            <th>Nom de doument</th>
                            <th>Document</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autorisationData.map(data => {
                            const documentInfo = documentData[data.documentId] || {};
                            const documentUrl = documentInfo.chemin || '#';
                            const documentName = documentInfo.nom || 'Aucun Document';

                            return (
                                <tr key={data.id}>
                                    <td>{data.utilisateur.id}</td>
                                    <td>{data.utilisateur.prenom}</td>
                                    <td>{data.utilisateur.typeUser}</td>
                                    <td>{findSocieteBySiteId(data.utilisateur.site.id)}</td>
                                    <td>{data.utilisateur.site.nomSite}</td>
                                    <td>{findDepartementByServiceId(data.utilisateur.service.id_service)}</td>
                                    <td>{findServiceById(data.utilisateur.service.id_service)}</td>
                                    <td>{documentName}</td>
                                    <td>
                                        {data.documentId ? (
                                            <div>
                                                <a
                                                    href={documentUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Voir Document
                                                </a>
                                                
                                            </div>
                                        ) : (
                                            'Aucun Document'
                                        )}
                                    </td>
                                    <td>{data.statut}</td>
                                    <td>
                                        <ButtonContainer>
                                            <AcceptButton onClick={() => handleAccept(data.id)}>Accepter</AcceptButton>
                                            <RejectButton onClick={() => handleReject(data.id)}>Refuser</RejectButton>
                                        </ButtonContainer>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
            <FloatingButton onClick={() => navigate('/home3')}>
                Retour en Arrière
            </FloatingButton>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    background: #f5f5f7;
    font-family: 'Montserrat', sans-serif;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #679F5A;
        color: white;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const AcceptButton = styled.button`
    background-color: #28a745; /* Green */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #218838; /* Darker green */
    }
`;

const RejectButton = styled.button`
    background-color: #dc3545; /* Red */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #c82333; /* Darker red */
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

export default AutorisationPage;
