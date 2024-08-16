import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate(); // Initialisation de navigate

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/departement/all');
                if (Array.isArray(response.data)) {
                    // Trie les départements par id_dep en ordre croissant
                    const sortedDepartments = response.data.sort((a, b) => a.id_dep - b.id_dep);
                    setDepartments(sortedDepartments);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const handleEdit = (id) => {
        navigate(`/departement-modify/${id}`); // Utilisation de navigate
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce département ?');
        if (!confirmDelete) return; // Annuler si l'utilisateur ne confirme pas
    
        try {
            await axios.delete(`http://localhost:8100/api/departement/delete/${id}`);
            setDepartments(departments.filter(department => department.id_dep !== id)); // Met à jour l'état local
            alert('Département supprimé avec succès!');
        } catch (error) {
            console.error('Error deleting department:', error);
            alert('Erreur lors de la suppression du département.');
        }
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom du Département</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                        <tr key={department.id_dep}>
                            <td>{department.id_dep}</td>
                            <td>{department.nomDep}</td>
                            <td>
                                <button style={{ backgroundColor: '#ddd1bc', padding: '5px' }} onClick={() => handleEdit(department.id_dep)}>Modifier</button>
                            </td>
                            <td>
                                <button style={{ backgroundColor: '#b292b6', padding: '5px' }} onClick={() => handleDelete(department.id_dep)}>Supprimer</button>
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

export default DepartmentList;
