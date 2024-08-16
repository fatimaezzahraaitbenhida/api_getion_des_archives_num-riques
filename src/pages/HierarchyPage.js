import React, { useState } from 'react';
import '../styles/hierarchy.css'; // Assurez-vous que le chemin est correct

const HierarchyPage = () => {
    const [expandedSections, setExpandedSections] = useState({});

    // Fonction pour basculer l'état d'expansion d'une section
    const handleToggle = (id) => {
        setExpandedSections(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="container">
            <h1>Hiérarchie</h1>
            <ul className="treeview">
                <li>
                    <span 
                        className={`toggle-icon ${expandedSections['societes'] ? 'expanded' : 'collapsed'}`} 
                        onClick={() => handleToggle('societes')}
                    >
                        <i className={`fa-solid ${expandedSections['societes'] ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                    <strong>Sociétés</strong>
                    {expandedSections['societes'] && (
                        <ul className="nested">
                            <li>
                                <span 
                                    className={`toggle-icon ${expandedSections['societeA'] ? 'expanded' : 'collapsed'}`} 
                                    onClick={() => handleToggle('societeA')}
                                >
                                    <i className={`fa-solid ${expandedSections['societeA'] ? 'fa-minus' : 'fa-plus'}`}></i>
                                </span>
                                <strong>Societe A</strong>
                                {expandedSections['societeA'] && (
                                    <ul className="nested">
                                        <li><strong>Site 1</strong></li>
                                        <li><strong>Site 2</strong></li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <span 
                                    className={`toggle-icon ${expandedSections['societeB'] ? 'expanded' : 'collapsed'}`} 
                                    onClick={() => handleToggle('societeB')}
                                >
                                    <i className={`fa-solid ${expandedSections['societeB'] ? 'fa-minus' : 'fa-plus'}`}></i>
                                </span>
                                <strong>Societe B</strong>
                                {expandedSections['societeB'] && (
                                    <ul className="nested">
                                        <li><strong>Site 1</strong></li>
                                        <li><strong>Site 2</strong></li>
                                        <li><strong>Site 3</strong></li>
                                        <li><strong>Site 4</strong></li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <span 
                        className={`toggle-icon ${expandedSections['sites'] ? 'expanded' : 'collapsed'}`} 
                        onClick={() => handleToggle('sites')}
                    >
                        <i className={`fa-solid ${expandedSections['sites'] ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                    <strong>Sites</strong>
                    {expandedSections['sites'] && (
                        <ul className="nested">
                            <li><strong>Site 1</strong></li>
                            <li><strong>Site 2</strong></li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default HierarchyPage;
