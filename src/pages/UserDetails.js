import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
    const location = useLocation();
    const user = location.state.user;

    return (
        <div>
            <h2>Détails de l'utilisateur</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Prénom:</strong> {user.prenom}</p>
            <p><strong>Email:</strong> {user.gmail}</p>
            <p><strong>Service:</strong> {user.serviceId}</p>
            <p><strong>Site:</strong> {user.siteId}</p>
            <p><strong>Société:</strong> {/* Afficher la société ici */}</p>
            {/* Ajoutez d'autres détails si nécessaire */}
        </div>
    );
};

export default UserDetails;
