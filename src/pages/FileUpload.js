import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [nom, setNom] = useState('');
  const [dateCreation, setDateCreation] = useState(new Date().toISOString().split('T')[0]);
  const [typeDoc, setTypeDoc] = useState('');
  const [employeEmail, setEmployeEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:8100/api/utilisateur/emails');
        if (Array.isArray(response.data)) {
          setEmails(response.data);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
        setMessage('Error fetching emails');
      }
    };

    fetchEmails();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadAndSave = async () => {
    if (!selectedFile) {
      setMessage('No file selected.');
      return;
    }

    // Step 1: Upload the file to Google Drive
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('typeDoc', typeDoc); // Ajoutez le type de document

    try {
      const uploadResponse = await fetch('http://localhost:8100/uploadToGoogleDrive', {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) {
        setMessage(uploadResult.message || 'Upload failed');
        return;
      }

      setMessage('File uploaded successfully: ' + uploadResult.url);

      // Step 2: Save the document information in the database
      const userId = await getUserIdByEmail(employeEmail);
      if (!userId) return;

      const documentData = {
        nom: nom,
        dateCreation: dateCreation,
        typeDoc: typeDoc,
        chemin: uploadResult.url, // Utilisez l'URL retournée par l'upload
        employeId: userId
      };

      const saveResponse = await axios.post(`http://localhost:8100/api/doc/save/${userId}`, documentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (saveResponse.status === 201) {
        setMessage('Document a enregistré avec succés');
        navigate('/home2');
      } else {
        setMessage('Error saving document: ' + (saveResponse.data.message || 'Save failed'));
      }
    } catch (error) {
      console.error('Error during upload and save:', error);
      setMessage('An error occurred during the process.');
    }
  };

  const getUserIdByEmail = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8100/api/utilisateur/id?email=${email}`);
      return response.data.id;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      setMessage('Error fetching user ID');
      return null;
    }
  };

  return (
    <div className="file-upload-container" style={{
      backgroundImage: 'url(https://example.com/image.jpg)', // Remplacez par votre image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // Changez de 'center' à 'flex-start' pour aligner le contenu vers le haut
  paddingTop: '20px'
    }}>
      <div className="file-upload-form" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond blanc avec transparence
        padding: '30px', // Augmentez le padding
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '600px', // Augmentez la largeur
        maxWidth: '90%', // Assurez-vous qu'il ne dépasse pas 90% de la largeur de l'écran
        display: 'flex',
        flexDirection: 'column' // Aligne les éléments en colonne
      }}>
        <h2>Télécharger un Document</h2>
        <form>
          <div className="form-group">
            <label>Fichier:</label>
            <input type="file" onChange={handleFileChange} required style={{ width: '100%', marginBottom: '10px' }} />
          </div>

          <div className="form-group">
            <label>Nom:</label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
          </div>

          <div className="form-group">
            <label>Date de Création:</label>
            <input type="date" value={dateCreation} onChange={(e) => setDateCreation(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
          </div>

          <div className="form-group">
            <label>Type de Document:</label>
            <select value={typeDoc} onChange={(e) => setTypeDoc(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }}>
              <option value="">Séléctionner le Type de Document</option>
              <option value="Contrats">Contrats</option>
              <option value="Factures">Factures</option>
              <option value="Reçus">Reçus</option>
              <option value="BilansComptables">Bilans Comptables</option>
              <option value="DéclarationsFiscales">Déclarations Fiscales</option>
              <option value="RelevésBancaires">Relevés Bancaires</option>
              <option value="AccordsDeConfidentialité">Accords De Confidentialité</option>
              <option value="LitigesEtContentieux">Litiges Et Contentieux</option>
              <option value="StatutsDeLaSociété">Statuts De La Société</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gmail Du Propriétaire:</label>
            <select
              value={employeEmail}
              onChange={(e) => setEmployeEmail(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            >
              <option value="">Séléctionner Un Gmail</option>
              {emails.map((email, index) => (
                <option key={index} value={email}>{email}</option>
              ))}
            </select>
          </div>

          <button
  type="button"
  onClick={handleUploadAndSave}
  style={{
    marginTop: '10px',
    width: '100%',
    backgroundColor: '#3e7046', // Corrected background color
    color: 'white', // Optional: Add text color for better contrast
    border: 'none', // Optional: Remove border
    padding: '10px', // Optional: Add padding for better button appearance
    borderRadius: '5px', // Optional: Add border radius for rounded corners
    cursor: 'pointer' // Optional: Add cursor pointer to indicate it's clickable
  }}
>
  Télécharger & Enregistrer
</button>

        </form>
        {message && <p>{message}</p>} {/* Affichage du message */}
      </div>
    </div>
  );
};

export default FileUpload;