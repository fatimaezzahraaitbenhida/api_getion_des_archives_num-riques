import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/style.css';
import AddDepartmentForm from './AddDepartmentForm';
import AddServiceForm from './AddServiceForm';
import AddSiteForm from './AddSiteForm';
import AddSocieteForm from './AddSocieteForm';
// Rename or fix the TreeView import if it conflicts
import TreeViewComponent from './TreeView'; // Renamed to avoid conflict with the React component name

const Home = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);
    const [showAddSiteForm, setShowAddSiteForm] = useState(false);
    const [showAddSocieteForm, setShowAddSocieteForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Page Admin';

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
    }, []);

    const handleAddEmployeeClick = () => {
        navigate('/add-employee');
    };
    const handleLogout = () => {
        localStorage.clear(); // Clear user data from local storage
        navigate('/login'); // Redirect to login page or homepage
    };
    const handleUserListClick = () => {
        navigate('/user-list');
    };

    const handleSiteListClick = () => {
        navigate('/site-list');
    };

    const handleDepartmentListClick = () => {
        navigate('/departement-list');
    };

    const handleServiceListClick = () => {
        navigate('/service-list');
    };

   

    const handleAddDepartmentClick = () => {
        setShowAddDepartmentForm(!showAddDepartmentForm);
        setShowAddServiceForm(false);
        setShowAddSiteForm(false);
        setShowAddSocieteForm(false);
    };

    const handleAddServiceClick = () => {
        setShowAddServiceForm(!showAddServiceForm);
        setShowAddDepartmentForm(false);
        setShowAddSiteForm(false);
        setShowAddSocieteForm(false);
    };

    const handleAddSiteClick = () => {
        setShowAddSiteForm(!showAddSiteForm);
        setShowAddDepartmentForm(false);
        setShowAddServiceForm(false);
        setShowAddSocieteForm(false);
    };

    const handleAddSocieteClick = () => {
        setShowAddSocieteForm(!showAddSocieteForm);
        setShowAddDepartmentForm(false);
        setShowAddServiceForm(false);
        setShowAddSiteForm(false);
    };

    const handleSocieteListClick = () => {
        navigate('/societe-list');
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
                            <a href="#" className="sidebar-link">
                                <i className="fa-solid fa-list pe-2"></i>
                                Historique
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#pages"
                               aria-expanded="false" aria-controls="pages">
                                <i className="fa-regular fa-file-lines pe-2"></i>
                                Gestion des Employés
                            </a>
                            <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleAddEmployeeClick}>Ajout des employés</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleUserListClick}>Consultation des employés</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard"
                               aria-expanded="false" aria-controls="dashboard">
                                <i className="fa-solid fa-sliders pe-2"></i>
                                Gestion des Départements
                            </a>
                            <ul id="dashboard" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleAddDepartmentClick}>Ajout des départements</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleDepartmentListClick}>Consultation des départements</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#auth"
                               aria-expanded="false" aria-controls="auth">
                                <i className="fa-regular fa-user pe-2"></i>
                                Gestion des Services
                            </a>
                            <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleAddServiceClick}>Ajout des services</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleServiceListClick}>Consultation des services</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#multi"
                               aria-expanded="false" aria-controls="multi">
                                <i className="fa-solid fa-share-nodes pe-2"></i>
                                Gestion des Sites
                            </a>
                            <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleAddSiteClick}>Ajout des sites</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleSiteListClick}>Consultation des sites</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#societe"
                               aria-expanded="false" aria-controls="societe">
                                <i className="fa-solid fa-building pe-2"></i>
                                Gestion des Sociétés
                            </a>
                            <ul id="societe" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleAddSocieteClick}>Ajout des sociétés</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link" onClick={handleSocieteListClick}>Consultation des sociétés</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link"  onClick={handleLogout}>
                                <i className="fa-solid fa-upload pe-2"></i> Déconnexion </a>
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
                    {showAddDepartmentForm && <AddDepartmentForm />}
                    {showAddServiceForm && <AddServiceForm />}
                    {showAddSiteForm && <AddSiteForm />}
                    {showAddSocieteForm && <AddSocieteForm />}
                    {/* Include TreeViewComponent if needed */}
                    {/* <TreeViewComponent /> */}
                </div>
            </div>
        </div>
    );
};

export default Home;
