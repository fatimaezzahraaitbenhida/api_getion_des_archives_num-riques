import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ListSociete = () => {
    const [societes, setSocietes] = useState([]);
    const navigate = useNavigate(); // Initialiser navigate

    useEffect(() => {
        const fetchSocietes = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/societe/all'); // Remplacez par votre endpoint
                console.log('Societes response:', response.data);
                if (Array.isArray(response.data)) {
                    // Tri des sociétés par id_societe en ordre croissant
                    const sortedSocietes = response.data.sort((a, b) => a.id - b.id);
                    setSocietes(sortedSocietes);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching societes:', error);
            }
        };
        

        fetchSocietes();
    }, []);

    const handleDelete = async (id_societe) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette société ?'); // Confirmation avant suppression
        if (!confirmDelete) return; // Si l'utilisateur annule, ne rien faire

        try {
            await axios.delete(`http://localhost:8100/api/societe/delete/${id_societe}`); // Remplacez par votre endpoint
            setSocietes(societes.filter(societe => societe.id_societe !== id_societe)); // Mettre à jour la liste des sociétés
            alert('Société supprimée avec succès!');
        } catch (error) {
            console.error('Error deleting societe:', error);
        }
    };

    const handleEdit = (id_societe) => {
        navigate(`/societe-modify/${id_societe}`); // Rediriger vers la page de modification avec l'ID de la société
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom de la Société</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {societes.map(societe => (
                        <tr key={societe.id_societe}>
                            <td>{societe.id}</td>
                            <td>{societe.nomSociete}</td>
                            <td>
                                <button style={{ backgroundColor: '#ddd1bc', padding: '5px' }} onClick={() => handleEdit(societe.id)}>
                                    Modifier
                                </button>
                            </td>
                            <td>
                                <button style={{ backgroundColor: '#b292b6', padding: '5px' }} onClick={() => handleDelete(societe.id_societe)}>
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

export default ListSociete;
