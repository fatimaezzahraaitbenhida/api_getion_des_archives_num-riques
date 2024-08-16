import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("Employe");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();

    if (!email) {
      alert('Veuillez entrer votre adresse email.');
      return;
    }
    if (!password) {
      alert('Veuillez entrer votre mot de passe.');
      return;
    }

    try {
      const res = await axios.post("http://localhost:8100/api/utilisateur/login", {
        email: email,
        password: password,
        typeUser: typeUser
      });

      if (res.data.status === false) {
        alert(res.data.message);
    } else if (res.data.status === true) {
        localStorage.setItem('userFirstName', res.data.prenom); // Assurez-vous que 'prenom' est renvoyé par l'API
        localStorage.setItem('userId', res.data.id);
        console.log('User ID stored in localStorage:', res.data.id);
        // Redirection en fonction du type d'utilisateur
        if (typeUser === "Admin") {
            navigate('/home'); // Redirection vers la page d'accueil pour Admin
        } else if (typeUser === "Responsable Archive") {
            navigate('/home2'); // Redirection vers home2 pour Responsable Archive
        } else if (typeUser === "Employé") {
            navigate('/home3'); // Redirection vers home2 pour Employé
        } else {
            navigate('/home'); // Redirection vers la page d'accueil par défaut
        }
    }
    } catch (err) {
      alert('Erreur de connexion');
      console.error(err);
    }
  }

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(rgba(39,39,39, 0.6), transparent)'
    },
    card: {
      width: '500px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.8)'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      marginBottom: '5px',
      display: 'block',
      color: '#333'
    },
    input: {
      width: '100%',
      height: '40px',
      padding: '0 10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      outline: 'none'
    },
    select: {
      width: '100%',
      height: '40px',
      padding: '0 10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      outline: 'none'
    },
    button: {
      width: '100%',
      height: '40px',
      borderRadius: '5px',
      background: '#28a745',
      color: '#fff',
      border: 'none',
      cursor: 'pointer'
    }
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>AUTHENTIFICATION</h1>
          <form onSubmit={login}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Adresse Email</label>
              <input
                type="email"
                className="form-control"
                style={styles.input}
                id="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Mot de passe</label>
              <input
                type="password"
                className="form-control"
                style={styles.input}
                id="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Type d'utilisateur</label>
              <select
                className="form-control"
                style={styles.select}
                id="typeUser"
                value={typeUser}
                onChange={(event) => {
                  setTypeUser(event.target.value);
                }}
              >
                <option value="Admin">Admin</option>
                <option value="Responsable Archive">Responsable Archive</option>
                <option value="Employé">Employé</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn green-button"
              style={styles.button}
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;