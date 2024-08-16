import React, { useState } from 'react';
import axios from 'axios';

const AddSocieteForm = () => {
  const [formData, setFormData] = useState({
    nomSociete: '', // Champ pour le nom de la société
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs requis
    if (!formData.nomSociete) {
      alert('Veuillez entrer un nom de société.');
      return;
    }

    // Log des données à envoyer
    console.log('Données à envoyer :', formData);

    try {
      const res = await axios.post("http://localhost:8100/api/societe/add", {
        nomSociete: formData.nomSociete,
      });

      if (res.status === 200) {
        alert('Société ajoutée avec succès!');
        console.log('Réponse de l\'API :', res.data);
        // Réinitialiser le formulaire après une soumission réussie
        setFormData({
          nomSociete: '',
        });
      } else {
        alert('Erreur lors de la création de la société.');
      }
    } catch (err) {
      // Gestion améliorée des erreurs
      if (err.response) {
        console.error('Erreur de connexion:', err.response.data);
        alert('Erreur de connexion : ' + (err.response.data.message || 'Une erreur est survenue'));
      } else if (err.request) {
        console.error('Aucune réponse reçue:', err.request);
        alert('Erreur de connexion : Aucune réponse reçue du serveur.');
      } else {
        console.error('Erreur:', err.message);
        alert('Erreur de connexion : ' + err.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.formTitle}>Ajouter Société</h1>
      <form id="form" style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.mainUserInfo}>
          <div style={styles.userInputBox}>
            <label htmlFor="nomSociete" style={styles.label}>Nom de la Société</label>
            <input
              type="text"
              id="nomSociete"
              name="nomSociete"
              placeholder="Entrer le nom de la société"
              value={formData.nomSociete}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        </div>
        <div style={styles.formSubmitBtn}>
          <button type="submit" style={styles.submitButton}>Ajouter Société</button>
        </div>
      </form>
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
  formSubmitBtn: {
    textAlign: 'center',
  },
  submitButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default AddSocieteForm;
