import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/style.css';

const Home3 = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const location = useLocation();

    useEffect(() => {
        document.title = 'Page Employé';

        const storedUserFirstName = localStorage.getItem('userFirstName');
        setUserFirstName(storedUserFirstName || 'Utilisateur');


        const toggler = document.querySelector(".btn");
        const sidebar = document.querySelector("#sidebar");

        const handleToggle = () => {
            if (sidebar) {
                sidebar.classList.toggle("collapsed");
            }
        };

        if (toggler) {
            toggler.addEventListener("click", handleToggle);
        }

        return () => {
            if (toggler) {
                toggler.removeEventListener("click", handleToggle);
            }
        };
    }, [location.search]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleDocumentList = () => {
        if (userId) {
            const url = `/document-list?userId=${encodeURIComponent(userId)}`;
            console.log('Navigating to:', url); // Ensure userId is included
            navigate(url);
        } else {
            console.error('User ID not found in localStorage');
        }
    };

    return (
        <div className="wrapper">
            <aside id="sidebar">
                <div className="h-100">
                    <div className="sidebar-logo">
                        <a href="#">Bienvenue {userFirstName}</a>
                    </div>
                    <ul className="sidebar-nav">
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link" onClick={handleDocumentList}>
                                <i className="fa-solid fa-sitemap pe-2"></i> Consultation Des Documents
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link" onClick={handleLogout}>
                                <i className="fa-solid fa-upload pe-2"></i> Déconnexion
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="main">
                <nav className="navbar navbar-expand px-3 border-bottom">
                    <button className="btn" type="button" data-bs-theme="dark">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                </nav>
                <div className="container-fluid">
                    {/* Add any additional content here */}
                </div>
            </div>
        </div>
    );
};

export default Home3;
