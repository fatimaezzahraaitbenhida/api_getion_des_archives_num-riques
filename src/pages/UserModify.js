import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const UserModify = () => {
    const { userId } = useParams(); // Get userId from URL parameters
    const [formData, setFormData] = useState({
        gmail: '',
        prenom: '',
        password: '',
        typeUser: '',
        siteId: '',
        serviceId: '',
    });

    const [services, setServices] = useState([]);
    const [filteredSites, setFilteredSites] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const navigate = useNavigate();

    // Fetch user data for update
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8100/api/utilisateur/${userId}`);
                setFormData({
                    gmail: response.data.gmail,
                    prenom: response.data.prenom,
                    password: '', // Do not pre-fill password for security reasons
                    typeUser: response.data.typeUser,
                    siteId: response.data.siteId || '',
                    serviceId: response.data.serviceId || '',
                });
                setSelectedService(response.data.serviceId || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    // Fetch services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/service/all');
                if (Array.isArray(response.data)) {
                    setServices(response.data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    // Fetch sites based on selected service
    useEffect(() => {
        if (selectedService) {
            const fetchSites = async () => {
                try {
                    const response = await axios.get(`http://localhost:8100/api/site/service/${selectedService}`);
                    if (Array.isArray(response.data)) {
                        setFilteredSites(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching sites:', error);
                }
            };
            fetchSites();
        } else {
            setFilteredSites([]);
        }
    }, [selectedService]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'serviceId') {
            setSelectedService(value);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.prenom || !formData.gmail || !formData.password) {
            alert('Veuillez remplir tous les champs requis.');
            return;
        }

        try {
            const res = await axios.put(`http://localhost:8100/api/utilisateur/update/${userId}`, formData);
            if (res.status === 200) {
                alert('Employé mis à jour avec succès!');
                navigate('/user-list'); // Redirect to home or any other page
            } else {
                alert('Erreur lors de la mise à jour de l\'utilisateur.');
            }
        } catch (err) {
            console.error('Erreur de connexion:', err);
            const errorMessage = err.response?.data?.message || 'Une erreur est survenue';
            alert(`Erreur de connexion : ${errorMessage}`);
        }
    };

    return (
        <Container>
            <h2>Modifier l'Employé</h2>
            <Form onSubmit={handleSubmit}>
                <Label>Email</Label>
                <Input
                    type="email"
                    value={formData.gmail}
                    onChange={handleChange}
                    name="gmail"
                    required
                />
                <Label>Mot de Passe</Label>
                <Input
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    required
                />
                <Label>Prénom</Label>
                <Input
                    type="text"
                    value={formData.prenom}
                    onChange={handleChange}
                    name="prenom"
                    required
                />
                <Label>Type d'utilisateur</Label>
                <Select
                    name="typeUser"
                    value={formData.typeUser}
                    onChange={handleChange}
                    required
                >
                    <option value="">Sélectionner un type d'utilisateur</option>
                    <option value="Responsable d'archive">Responsable d'archive</option>
                    <option value="Employé">Employé</option>
                    <option value="Admin">Admin</option>
                </Select>
                <Label>Service</Label>
                <Select
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Sélectionner un service</option>
                    {Array.isArray(services) && services.map((service) => (
                        <option key={service.id_service} value={service.id_service}>
                            {service.nomService || 'Nom non défini'}
                        </option>
                    ))}
                </Select>
                <Label>Site</Label>
                <Select
                    name="siteId"
                    value={formData.siteId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Sélectionner un site</option>
                    {Array.isArray(filteredSites) && filteredSites.map((site) => (
                        <option key={site.id_site} value={site.id}>
                            {site.nomSite || 'Nom non défini'}
                        </option>
                    ))}
                </Select>
                <Button type="submit">Sauvegarder</Button>
                <Button type="button" onClick={() => navigate('/user-list')}>Annuler</Button>
            </Form>
        </Container>
    );
};

const Container = styled.div`
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Select = styled.select`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background-color: #5670be;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #455a99;
    }
`;

export default UserModify;