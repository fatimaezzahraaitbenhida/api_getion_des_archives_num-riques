import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchServices();
    }, []);

    const handleDelete = async (id_service) => {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?'); // Confirmation avant suppression
        if (!confirmDelete) return; // Si l'utilisateur annule, ne rien faire

        try {
            await axios.delete(`http://localhost:8100/api/service/delete/${id_service}`);
            setServices(services.filter(service => service.id_service !== id_service));
            alert('Service supprimé avec succès!');
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleEdit = (id_service) => {
        navigate(`/service-modify/${id_service}`);
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom du Service</th>
                        <th>Département</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id_service}>
                            <td>{service.id_service}</td>
                            <td>{service.nomService}</td>
                            <td>{service.departement ? service.departement.nomDep : 'Non défini'}</td>
                            <td>
                                <button style={{ backgroundColor: '#ddd1bc', padding: '5px' }} onClick={() => handleEdit(service.id_service)}>
                                    Modifier
                                </button>
                            </td>
                            <td>
                                <button style={{ backgroundColor: '#b292b6', padding: '5px' }} onClick={() => handleDelete(service.id_service)}>
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
        background-image: url('../images/prefa.jpg');
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

export default ServiceList;
