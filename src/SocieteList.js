// src/pages/SocieteList.js

import React, { useState, useEffect } from 'react';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';

// Exemple de données
const data = [
  { id: '1', text: 'Société 1', expanded: true, items: [
    { id: '1-1', text: 'Site 1-1' },
    { id: '1-2', text: 'Site 1-2' }
  ]},
  { id: '2', text: 'Société 2', expanded: true, items: [
    { id: '2-1', text: 'Site 2-1' }
  ]}
];

function SocieteList() {
  return (
    <div>
      <h1>Liste des Sociétés</h1>
      <TreeViewComponent fields={{ dataSource: data, id: 'id', text: 'text', child: 'items' }} />
    </div>
  );
}

export default SocieteList;
