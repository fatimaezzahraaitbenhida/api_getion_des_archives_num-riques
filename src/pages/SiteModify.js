import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SiteModify = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [siteName, setSiteName] = useState('');
    const [societes, setSocietes] = useState([]);
    const [selectedSociete, setSelectedSociete] = useState('');

    useEffect(() => {
        document.body.classList.add('site-modify-page');

        const fetchSite = async () => {
            try {
                const response = await axios.get(`http://localhost:8100/api/site/${id}`);
                if (response.data) {
                    setSiteName(response.data.nomSite);
                    setSelectedSociete(response.data.societe ? response.data.societe.id : '');
                }
            } catch (error) {
                console.error('Error fetching site:', error);
            }
        };

        const fetchSocietes = async () => {
            try {
                const response = await axios.get('http://localhost:8100/api/societe/all');
                setSocietes(response.data);
            } catch (error) {
                console.error('Error fetching societes:', error);
            }
        };

        fetchSite();
        fetchSocietes();

        return () => {
            document.body.classList.remove('site-modify-page');
        };
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8100/api/site/update/${id}`, { nomSite: siteName, societeId: selectedSociete });
            if (response.status === 200) {
                alert('Site modifié avec succès!');
                navigate('/site-list');
            } else {
                alert('Erreur lors de la mise à jour du site.');
            }
        } catch (error) {
            console.error('Error updating site:', error);
        }
    };

    return (
        <Container>
            <h2>Modifier le Site</h2>
            <Form onSubmit={handleSubmit}>
                <Label>Nom du Site</Label>
                <Input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    required
                />
                <Label>Société</Label>
                <Select value={selectedSociete} onChange={(e) => setSelectedSociete(e.target.value)} required>
                    <option value="">Sélectionner une société</option>
                    {societes.map(societe => (
                        <option key={societe.id} value={societe.id}>{societe.nomSociete}</option>
                    ))}
                </Select>
                <Button type="submit">Sauvegarder</Button>
                <Button type="button" onClick={() => navigate('/site-list')}>Annuler</Button>
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

export default SiteModify;
