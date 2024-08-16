import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './pages/Login';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import AddEmployeeForm from './pages/AddEmployeeForm';
import AddDepartmentForm from './pages/AddDepartmentForm';
import AddServiceForm from './pages/AddServiceForm'; 
import AddSiteForm from './pages/AddSiteForm'; 
import AddSocieteForm from './pages/AddSocieteForm';
import UserList from './pages/UserList';
import DepartmentList from './pages/DepartmentList';
import DocumentList from './pages/DocumentList';
import SiteList from './pages/SiteList';
import ServiceList from './pages/ServiceList'; 
import SocieteList from './pages/SocieteList'; 
import FileUpload from './pages/FileUpload';
import ServiceModify from './pages/ServiceModify';
import SiteModify from './pages/SiteModify';
import SocieteModify from './pages/SocieteModify';
import DepartementModify from './pages/DepartementModify';
import UserModify from './pages/UserModify';
import UserDetails from './pages/UserDetails';
import TreeView from './pages/TreeView'; // Import TreeView
import AutorisationPage from './pages/AutorisationPage';
import { AuthProvider }  from './contexts/AuthContext';
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/home3" element={<Home3 />} />
        <Route path="/" element={<Login />} />
        <Route path="/add-employee" element={<AddEmployeeForm />} />
        <Route path="/auth" element={<AutorisationPage />} />
        <Route path="/add-department" element={<AddDepartmentForm />} />
        <Route path="/add-service" element={<AddServiceForm />} />
        <Route path="/add-societe" element={<AddSocieteForm />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/user-modify/:userId" element={<UserModify />} />
        <Route path="/departement-list" element={<DepartmentList />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/document-list" element={<DocumentList />} />
        <Route path="/departement-modify/:id" element={<DepartementModify />} />
        <Route path="/service-list" element={<ServiceList />} />
        <Route path="/service-modify/:id" element={<ServiceModify />} />
        <Route path="/societe-modify/:id" element={<SocieteModify />} />
        <Route path="/site-list" element={<SiteList />} />
        <Route path="/societe-list" element={<SocieteList />} />
        <Route path="/add-site" element={<AddSiteForm />} />

        <Route path="/autorisation" element={<AutorisationPage />} /> {/* Add this */}
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/site-modify/:id" element={<SiteModify />} />
        <Route path="/treeview" element={<TreeView />} /> {/* Rendre TreeView uniquement sur cette route */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
