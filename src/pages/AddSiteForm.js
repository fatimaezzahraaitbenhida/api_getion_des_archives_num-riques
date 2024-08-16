import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSiteForm = () => {
  const [formData, setFormData] = useState({
    nomSite: '', // Champ pour le nom du site
    societeId: '' // Champ pour l'ID de la société sélectionnée
  });
  const [societes, setSocietes] = useState([]); // État pour les sociétés

  useEffect(() => {
    // Fonction pour récupérer les sociétés
    const fetchSocietes = async () => {
      try {
        const res = await axios.get("http://localhost:8100/api/societe/all");
        setSocietes(res.data); // Assurez-vous que la réponse contient les données des sociétés
      } catch (err) {
        console.error('Erreur lors de la récupération des sociétés:', err);
      }
    };

    fetchSocietes();
  }, []);

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
    if (!formData.nomSite || !formData.societeId) {
      alert('Veuillez entrer un nom de site et sélectionner une société.');
      return;
    }

    // Log des données à envoyer
    console.log('Données à envoyer :', formData);

    try {
      const res = await axios.post("http://localhost:8100/api/site/add", {
        nomSite: formData.nomSite,
        societeId: formData.societeId, // Inclure l'ID de la société
      });

      if (res.status === 200) {
        alert('Site ajouté avec succès!');
        console.log('Réponse de l\'API :', res.data);
        // Réinitialiser le formulaire après une soumission réussie
        setFormData({
          nomSite: '',
          societeId: '',
        });
      } else {
        alert('Erreur lors de la création du site.');
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
      <h1 style={styles.formTitle}>Ajouter Site</h1>
      <form id="form" style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.mainUserInfo}>
          <div style={styles.userInputBox}>
            <label htmlFor="nomSite" style={styles.label}>Nom du Site</label>
            <input
              type="text"
              id="nomSite"
              name="nomSite"
              placeholder="Entrer le nom du site"
              value={formData.nomSite}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.userInputBox}>
            <label htmlFor="societeId" style={styles.label}>Société</label>
            <select
              id="societeId"
              name="societeId"
              value={formData.societeId}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Sélectionner une société</option>
              {societes.map((societe) => (
                <option key={societe.id} value={societe.id}>
                  {societe.nomSociete}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={styles.formSubmitBtn}>
          <button type="submit" style={styles.submitButton}>Ajouter Site</button>
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

export default AddSiteForm;
