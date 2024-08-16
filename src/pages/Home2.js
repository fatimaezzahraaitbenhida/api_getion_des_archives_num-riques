import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/style.css';
import TreeViewComponent from './TreeView'; // Assurez-vous que le nom est correct
import FileUpload from './FileUpload'; // Importez le composant FileUpload

const Home2 = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [showFileUploadForm, setShowFileUploadForm] = useState(false);
    const [showTreeView, setShowTreeView] = useState(false); // État pour afficher TreeView
    const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);
    const [showAddSiteForm, setShowAddSiteForm] = useState(false);
    const [showAddSocieteForm, setShowAddSocieteForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Page Responsable d'archive";

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

    const handleLogout = () => {
        localStorage.clear(); // Clear user data from local storage
        navigate('/login'); // Redirect to login page or homepage
    };

    const handleFileUploadClick = () => {
        setShowFileUploadForm(true);
        setShowTreeView(false); // Masquer TreeView
        setShowAddDepartmentForm(false);
        setShowAddServiceForm(false);
        setShowAddSiteForm(false);
        setShowAddSocieteForm(false);
    };

    const handleHierarchyPageClick = () => {
        setShowFileUploadForm(false); // Masquer FileUpload
        setShowTreeView(true); // Afficher TreeView
        setShowAddDepartmentForm(false);
        setShowAddServiceForm(false);
        setShowAddSiteForm(false);
        setShowAddSocieteForm(false);
    };

    // Add handleAutorisationPageClick function
    const handleAutorisationPageClick = () => {
        navigate('/autorisation'); // Redirect to AutorisationPage
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
                            <a href="#" className="sidebar-link" onClick={handleFileUploadClick}>
                                <i className="fa-solid fa-upload pe-2"></i>
                                Télécharger Des Documents
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link" onClick={handleHierarchyPageClick}>
                                <i className="fa-solid fa-sitemap pe-2"></i>
                                Consultation Des Documents
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link" onClick={handleAutorisationPageClick}>
                                <i className="fa-solid fa-lock pe-2"></i>
                                Traitement D'Autorisation
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link" onClick={handleLogout}>
                                <i className="fa-solid fa-sign-out-alt pe-2"></i> Déconnexion
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
                    {showFileUploadForm && <FileUpload />}
                    {showTreeView && <TreeViewComponent />}
                </div>
            </div>
        </div>
    );
};

export default Home2;
