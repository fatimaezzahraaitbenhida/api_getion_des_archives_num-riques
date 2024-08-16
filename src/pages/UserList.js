import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [sites, setSites] = useState([]);
    const [services, setServices] = useState([]);
    const [societies, setSocieties] = useState([]); // Ajouter un état pour les sociétés
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/utilisateur/read');
                console.log('Users response:', response.data);
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/departement/all');
                console.log('Departments response:', response.data);
                if (Array.isArray(response.data)) {
                    setDepartments(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        const fetchSites = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/site/all');
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

        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/service/all');
                console.log('Services response:', response.data);
                if (Array.isArray(response.data)) {
                    setServices(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchSocieties = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/societe/all'); // Endpoint pour les sociétés
                console.log('Societies response:', response.data);
                if (Array.isArray(response.data)) {
                    setSocieties(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching societies:', error);
            }
        };

        fetchUsers();
        fetchDepartments();
        fetchSites();
        fetchServices();
        fetchSocieties();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8100/api/utilisateur/delete/${id}`);
            setUsers(users.filter(user => user.id !== id));
            alert('Utilisateur supprimé avec succès!');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/user-modify/${id}`);
    };

    const getDepartmentName = (serviceId) => {
        const service = services.find(service => service.id_service === serviceId);
        return service && service.departement ? service.departement.nomDep : 'N/A';
    };
    

    const getSiteName = (id) => {
        const site = sites.find(site => site.id=== id);
        return site ? site.nomSite : 'N/A';
    };

    const getServiceName = (id) => {
        const service = services.find(service => service.id_service === id);
        return service ? service.nomService : 'N/A';
    };

    const getSocietyName = (siteId) => {
        const site = sites.find(site => site.id === siteId);
        const society = site ? societies.find(soc => soc.id === site.societeId) : null;
        return society ? society.nomSociete : 'N/A';
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Mot de passe</th>
                        <th>Service</th>
                        <th>Département</th>
                        <th>Site</th>
                        <th>Société</th> {/* Ajouter colonne Société */}
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.prenom}</td>
                                <td>{user.gmail}</td>
                                <td>{user.password}</td>
                                <td>{getServiceName(user.serviceId)}</td>
                                <td>{getDepartmentName(user.serviceId)}</td>
                                <td>{getSiteName(user.siteId)}</td>
                                <td>{getSocietyName(user.siteId)}</td> {/* Afficher la société */}
                                <td>
                                    <button style={{ backgroundColor: '#ddd1bc', padding: '5px' }} onClick={() => handleEdit(user.id)}>
                                        Modifier
                                    </button>
                                </td>
                                <td>
                                    <button style={{ backgroundColor: '#b292b6', padding: '5px' }} onClick={() => handleDelete(user.id)}>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">Aucun utilisateur trouvé</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <FloatingButton onClick={() => navigate('/home')}>
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

export default UserList;
