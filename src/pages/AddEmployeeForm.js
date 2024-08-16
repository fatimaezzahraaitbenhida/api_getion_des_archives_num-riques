import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AddEmployeeForm = () => {
    const [formData, setFormData] = useState({
        gmail: '',
        prenom: '',
        password: '',
        typeUser: '',
        siteId: '',
        serviceId: '',
    });

    const [services, setServices] = useState([]);
    const [sites, setSites] = useState([]);
    const [filteredSites, setFilteredSites] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const navigate = useNavigate(); // Initialisation de navigate

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

        // Validation des champs requis
        if (!formData.prenom || !formData.gmail || !formData.password) {
            alert('Veuillez remplir tous les champs requis.');
            return;
        }

        try {
            const res = await axios.post("http://localhost:8100/api/utilisateur/save", formData);
            if (res.status === 200) { // Assurez-vous que le code de succès est 200
                alert('Employé ajouté avec succès!');
                setFormData({
                    gmail: '',
                    prenom: '',
                    password: '',
                    typeUser: '',
                    siteId: '',
                    serviceId: '',
                });
                // Rediriger vers le même formulaire après la soumission réussie
                navigate('/add-employee'); // Remplacez '/add-employee' par le chemin du formulaire
            } else {
                alert('Erreur lors de la création de l\'utilisateur.');
            }
        } catch (err) {
            console.error('Erreur de connexion:', err);
            const errorMessage = err.response?.data?.message || 'Une erreur est survenue';
            alert(`Erreur de connexion : ${errorMessage}`);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.formTitle}>Ajouter Employé</h1>
            <form id="form" style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.mainUserInfo}>
                    <div style={styles.userInputBox}>
                        <label htmlFor="gmail" style={styles.label}>Email</label>
                        <input
                            type="email"
                            id="gmail"
                            name="gmail"
                            placeholder="Entrer un email"
                            value={formData.gmail}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.userInputBox}>
                        <label htmlFor="password" style={styles.label}>Mot De Passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Entrer un mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.userInputBox}>
                        <label htmlFor="prenom" style={styles.label}>Prénom</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            placeholder="Entrer un prénom"
                            value={formData.prenom}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.userInputBox}>
                        <label htmlFor="typeUser" style={styles.label}>Type d'utilisateur</label>
                        <select
                            id="typeUser"
                            name="typeUser"
                            value={formData.typeUser}
                            onChange={handleChange}
                            style={styles.select}
                        >
                            <option value="">Sélectionner un type d'utilisateur</option>
                            <option value="Responsable d'archive">Responsable d'archive</option>
                            <option value="Employé">Employé</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div style={styles.userInputBox}>
                        <label htmlFor="serviceId" style={styles.label}>Service</label>
                        <select
                            id="serviceId"
                            name="serviceId"
                            value={formData.serviceId}
                            onChange={handleChange}
                            style={styles.select}
                        >
                            <option value="">Sélectionner un service</option>
                            {Array.isArray(services) && services.map((service) => (
                                <option key={service.id_service} value={service.id_service}>
                                    {service.nomService || 'Nom non défini'}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.userInputBox}>
                        <label htmlFor="siteId" style={styles.label}>Site</label>
                        <select
                            id="siteId"
                            name="siteId"
                            value={formData.siteId}
                            onChange={handleChange}
                            style={styles.select}
                        >
                            <option value="">Sélectionner un site</option>
                            {Array.isArray(filteredSites) && filteredSites.map((site) => (
                                <option key={site.id_site} value={site.id}>
                                    {site.nomSite || 'Nom non défini'}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={styles.formSubmitBtn}>
                    <button type="submit" style={styles.submitButton}>Ajouter Employé</button>
                </div>
            </form>
            <FloatingButton onClick={() => navigate('/home')}>
                Retour en Arrière
            </FloatingButton>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',
    },
    formTitle: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    mainUserInfo: {
        marginBottom: '20px',
    },
    userInputBox: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    select: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    formSubmitBtn: {
        textAlign: 'center',
    },
    submitButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};
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

export default AddEmployeeForm;
