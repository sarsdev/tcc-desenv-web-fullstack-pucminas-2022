import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/login';
import Inicial from './components/inicial/inicial';
import PaginaInexistente from './components/pagina-inexistente/pagina-inexistente';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/app/acesso" element={<Login />} />
        <Route path="/app/inicial" element={<Inicial />} />
        <Route path="*" element={<PaginaInexistente />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);