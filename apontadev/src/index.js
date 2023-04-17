import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/login/login'
import Inicial from './components/inicial/inicial'
import Permissao from './components/permissao/permissao'
import Acessibilidade from './components/acessibilidade/acessibilidade'
import Usuario from './components/usuario/usuario'
import Funcao from './components/funcao/funcao'
import Equipe from './components/equipe/equipe'
import Projeto from './components/projeto/projeto'
import Agenda from './components/agenda/agenda'
import Manutencao from './components/manutencao/manutencao'
import Acompanhamento from './components/acompanhamento/acompanhamento'
import Simulador from './components/simulador/simulador'
import PaginaInexistente from './components/pagina-inexistente/pagina-inexistente'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/app/acesso" element={<Login />} />
        <Route path="/app/inicial" element={<Inicial />} />
        <Route path="/app/permissao" element={<Permissao />} />
        <Route path="/app/acessibilidade" element={<Acessibilidade />} />
        <Route path="/app/usuario" element={<Usuario />} />
        <Route path="/app/funcao" element={<Funcao />} />
        <Route path="/app/equipe" element={<Equipe />} />
        <Route path="/app/projeto" element={<Projeto />} />
        <Route path="/app/agenda" element={<Agenda />} />
        <Route path="/app/manutencao" element={<Manutencao />} />
        <Route path="/app/acompanhamento" element={<Acompanhamento />} />
        <Route path="/app/simulador" element={<Simulador />} />
        <Route path="*" element={<PaginaInexistente />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);