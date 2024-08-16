import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SiteList = () => {
    const [sites, setSites] = useState([]);
    const navigate = useNavigate(); // Initialiser navigate

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/site/all'); // Remplacez par votre endpoint
                console.log('Sites response:', response.data);
                if (Array.isArray(response.data)) {
                    setSites(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching sites:', error);
            }
        };

        fetchSites();
    }, []);

    const handleDelete = async (id_site) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce site ?'); // Confirmation avant suppression
        if (!confirmDelete) return; // Si l'utilisateur annule, ne rien faire

        try {
            await axios.delete(`http://localhost:8100/api/site/delete/${id_site}`); // Remplacez par votre endpoint
            setSites(sites.filter(site => site.id_site !== id_site)); // Mettre à jour la liste des sites
            alert('Site supprimé avec succès!');
        } catch (error) {
            console.error('Error deleting site:', error);
        }
    };

    const handleEdit = (id_site) => {
        navigate(`/site-modify/${id_site}`); // Rediriger vers la page de modification avec l'ID du site
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom du Site</th>
                        <th>Société Associée</th> {/* Ajout de la colonne Société */}
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map(site => (
                        <tr key={site.id_site}>
                            <td>{site.id}</td>
                            <td>{site.nomSite}</td>
                            <td>{site.societe ? site.societe.nomSociete : 'Non spécifié'}</td> {/* Affichage du nom de la société */}
                            <td>
                                <button style={{ backgroundColor: '#ddd1bc', padding: '5px' }} onClick={() => handleEdit(site.id)}>
                                    Modifier
                                </button>
                            </td>
                            <td>
                                <button style={{ backgroundColor: '#b292b6', padding: '5px' }} onClick={() => handleDelete(site.id_site)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <FloatingButton onClick={() => navigate('/home')}>
                Retour en Arriere
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

export default SiteList;
