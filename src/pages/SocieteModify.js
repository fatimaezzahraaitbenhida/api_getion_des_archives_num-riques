import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SocieteModify = () => {
    const { id } = useParams(); // Obtenir l'ID de la société depuis les paramètres de l'URL
    const navigate = useNavigate();
    const [societeName, setSocieteName] = useState('');

    useEffect(() => {
        document.body.classList.add('societe-modify-page');

        const fetchSociete = async () => {
            try {
                const response = await axios.get(`http://localhost:8100/api/societe/${id}`);
                if (response.data) {
                    setSocieteName(response.data.nomSociete);
                }
            } catch (error) {
                console.error('Error fetching societe:', error);
            }
        };

        fetchSociete();

        return () => {
            document.body.classList.remove('societe-modify-page');
        };
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8100/api/societe/update/${id}`, { nomSociete: societeName });
            if (response.status === 200) {
                alert('Société modifiée avec succès!');
                navigate('/societe-list');
            } else {
                alert('Erreur lors de la mise à jour de la société.');
            }
        } catch (error) {
            console.error('Error updating societe:', error);
        }
    };

    return (
        <Container>
            <h2>Modifier la Société</h2>
            <Form onSubmit={handleSubmit}>
                <Label>Nom de la Société</Label>
                <Input
                    type="text"
                    value={societeName}
                    onChange={(e) => setSocieteName(e.target.value)}
                    required
                />
                <Button type="submit">Sauvegarder</Button>
                <Button type="button" onClick={() => navigate('/societe-list')}>Annuler</Button>
            </Form>
            <FloatingButton onClick={() => navigate('/home')}>
                Retour en Arrière
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
        background-color: #c1a48c;
        color: #e9ecf1;
    }

    &:focus {
        outline: none;
    }
`;

export default SocieteModify;
