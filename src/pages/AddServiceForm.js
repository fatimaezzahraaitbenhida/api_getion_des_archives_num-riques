import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    nomService: '',
    departmentId: '',
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('http://localhost:8100/api/departement/all');
        console.log('Départements récupérés :', res.data); // Log des données pour vérification
        setDepartments(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des départements:', err);
      }
    };

    fetchDepartments();
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

    if (!formData.nomService || !formData.departmentId) {
      alert('Veuillez entrer un nom de service et sélectionner un département.');
      return;
    }

    try {
      const res = await axios.post("http://localhost:8100/api/service/add", {
        nomService: formData.nomService,
        id_dep: formData.departmentId,
      });

      if (res.status === 200) {
        alert('Service ajouté avec succès!');
        setFormData({
          nomService: '',
          departmentId: '',
        });
      } else {
        alert('Erreur lors de la création du service.');
      }
    } catch (err) {
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
      <h1 style={styles.formTitle}>Ajouter Service</h1>
      <form id="form" style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.mainUserInfo}>
          <div style={styles.userInputBox}>
            <label htmlFor="nomService" style={styles.label}>Nom du Service</label>
            <input
              type="text"
              id="nomService"
              name="nomService"
              placeholder="Entrer le nom du service"
              value={formData.nomService}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.userInputBox}>
            <label htmlFor="departmentId" style={styles.label}>Département</label>
            <select
              id="departmentId"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Sélectionner un département</option>
              {departments.map(department => (
                <option key={department.id_dep} value={department.id_dep}>
                  {department.nomDep}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={styles.formSubmitBtn}>
          <button type="submit" style={styles.submitButton}>Ajouter Service</button>
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
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default AddServiceForm;
