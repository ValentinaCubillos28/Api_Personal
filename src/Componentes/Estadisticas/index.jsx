import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexto/contexto';
import './style.css';

export default function Estadisticas() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const { setUsuarioSeleccionado } = useContext(AppContext);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://randomuser.me/api/?results=10');
        const data = await res.json();
        setUsuarios(data.results);
      } catch (error) {
        console.error('Error al traer usuarios:', error);
      }
    }
    fetchUsers();
  }, []);

  function handleHablar(usuario) {
    navigate('/contactos', { state: { usuario } });
  }

  function handleVerPerfil(usuario) {
    setUsuarioSeleccionado(usuario);
    navigate('/configuracion');
  }

  return (
    <div className="estadisticas-page">
      <div className="estadisticas-container">
        <h2>Explora Personas</h2>
        <p>¿Con cuál de estos te gustaría hablar?</p>
        <div className="usuarios-lista">
          {usuarios.map((u, i) => (
            <div key={i} className="usuario-card">
              <img src={u.picture.medium} alt={`${u.name.first} ${u.name.last}`} />
              <p>{u.name.first} {u.name.last}</p>
              <button className="hablar-btn" onClick={() => handleHablar(u)}>Hablar</button>
              <button className="ver-perfil-btn" onClick={() => handleVerPerfil(u)}>Ver Perfil</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
