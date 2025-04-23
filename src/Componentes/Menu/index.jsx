import { useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css'

function Menu() {

    return (
        <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/Perfil">Perfil</Link>
          <Link to="/Configuracion">Configuracion</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Contactos">Contactos</Link>
          <Link to="/Estadisticas">Estadisticas</Link>
        </nav>
    )
}

export default Menu