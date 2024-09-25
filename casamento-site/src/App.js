import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import ConfirmarPresenca from './Pages/ConfirmarPresenca';
import DataLocalizacao from './Pages/DataLocalizacao';
import Cronograma from './Pages/Cronograma';
import ListaPresentes from './Pages/ListaPresentes';
import Convite from './Pages/Convite';

/* Importação do arquivo CSS */
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirmar-presenca" element={<ConfirmarPresenca />} />
          <Route path="/data-localizacao" element={<DataLocalizacao />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path="/lista-presentes" element={<ListaPresentes />} />
          <Route path="/convite" element={<Convite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
