import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const DepartementModify = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [departementName, setDepartementName] = useState('');

    useEffect(() => {
        document.body.classList.add('departement-modify-page');
        const fetchDepartement = async () => {
            try {
                const response = await axios.get(`http://localhost:8100/api/departement/${id}`);
                if (response.data) {
                    setDepartementName(response.data.nomDepartement);
                }
            } catch (error) {
                console.error('Error fetching departement:', error);
            }
        };

        fetchDepartement();
        return () => {
            document.body.classList.remove('departement-modify-page');
        };
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8100/api/departement/update/${id}`, { nomDepartement: departementName });
            if (response.status === 200) {
                alert('Département modifié avec succès!');
                navigate('/departement-list');
            } else {
                alert('Erreur lors de la mise à jour du département.');
            }
        } catch (error) {
            console.error('Error updating departement:', error);
        }
    };

    return (
        <Container>
            <h2>Modifier le Département</h2>
            <Form onSubmit={handleSubmit}>
                <Label>Nom du Département</Label>
                <Input
                    type="text"
                    value={departementName}
                    onChange={(e) => setDepartementName(e.target.value)}
                    required
                />
                <Button type="submit">Sauvegarder</Button>
                <Button type="button" onClick={() => navigate('/departement-list')}>Annuler</Button>
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
    background-color: #ffffff; /* Plain white background */
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

export default DepartementModify;
