import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ServiceModify = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [serviceName, setServiceName] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        document.body.classList.add('service-modify-page');

        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:8100/api/service/${id}`);
                if (response.data) {
                    setServiceName(response.data.nomService);
                    setSelectedDepartment(response.data.id_dep); // Set initial department value
                }
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/departement/all');
                if (response.data) {
                    setDepartments(response.data);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchService();
        fetchDepartments();

        return () => {
            document.body.classList.remove('service-modify-page');
        };
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.put(`http://localhost:8100/api/service/update/${id}`, {
                nomService: serviceName,
                id_dep: selectedDepartment, // Change from departmentId to id_dep
            });
            if (response.status === 200) {
                alert('Service modifié avec succès!');
                navigate('/service-list');
            } else {
                alert('Erreur lors de la mise à jour du service.');
            }
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };
    

    return (
        <Container>
            <h2>Modifier le Service</h2>
            <Form onSubmit={handleSubmit}>
                <Label>Nom du Service</Label>
                <Input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                />
                <Label>Département</Label>
                <Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    required
                >
                    <option value="">Sélectionner un département</option>
                    {departments.map(department => (
                        <option key={department.id_dep} value={department.id_dep}>
                            {department.nomDep}
                        </option>
                    ))}
                </Select>
                <Button type="submit">Sauvegarder</Button>
                <Button type="button" onClick={() => navigate('/service-list')}>Annuler</Button>
            </Form>
            <FloatingButton onClick={() => navigate('/home')}>
                Retour en Arriere
            </FloatingButton>
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
        background-image: url('../images/prefa.jpg');
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
        
`
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

export default ServiceModify;
