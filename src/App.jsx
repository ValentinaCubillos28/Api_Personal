import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Configuracion from './Componentes/Configuracion'
import Busqueda from './Componentes/Busqueda'
import Contactos from './Componentes/Contactos'
import Perfil from './Componentes/Perfil'
import Estadisticas from './Componentes/Estadisticas'
import Inicio from './Componentes/Inicio'
import Menu from './Componentes/Menu';
import Favoritos from './Componentes/Favoritos';

function App() {

  return (

    <>
    <Router>

      <Menu/>
      
      <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/Perfil/:name" element={<Perfil />} />
      <Route path="/Configuracion" element={<Configuracion />} />
      <Route path="/Busqueda" element={<Busqueda />} />
      <Route path="/Contactos" element={<Contactos />} />
      <Route path="/Estadisticas" element={<Estadisticas />} />
      <Route path="/Favoritos" element={<Favoritos />} />
      </Routes>
    </Router>
  </>

  )
}

export default App
