import React, { useState } from 'react';
import axios from 'axios';

const AddDepartmentForm = () => {
  const [formData, setFormData] = useState({
    nomDepartement: '', // Champ pour le nom du département
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
    if (!formData.nomDepartement) {
        alert('Veuillez entrer un nom de département.');
        return;
    }

    // Log des données à envoyer
    console.log('Données à envoyer :', formData);

    try {
        const res = await axios.post("http://localhost:8100/api/departement/add", {
            nomDepartement: formData.nomDepartement,
        });

        if (res.status === 200) {
            alert('Département ajouté avec succès!');
            console.log('Réponse de l\'API :', res.data);
            setFormData({
                nomDepartement: '',
            });
        } else {
            alert('Erreur lors de la création du département.');
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
      <h1 style={styles.formTitle}>Ajouter Département</h1>
      <form id="form" style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.mainUserInfo}>
          <div style={styles.userInputBox}>
            <label htmlFor="nomDepartement" style={styles.label}>Nom du Département</label>
            <input
              type="text"
              id="nomDepartement"
              name="nomDepartement"
              placeholder="Entrer le nom du département"
              value={formData.nomDepartement}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        </div>
        <div style={styles.formSubmitBtn}>
          <button type="submit" style={styles.submitButton}>Ajouter Département</button>
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
    marginTop: '50px', // Adjust this value to move the form down
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

export default AddDepartmentForm;
