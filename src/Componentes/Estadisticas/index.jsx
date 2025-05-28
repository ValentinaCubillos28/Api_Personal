import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Estadisticas() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="estadisticas-container">
      <h2>Explora Personas</h2>
      <p>¿Con cuál de estos te gustaría hablar?</p>
      <div className="usuarios-lista">
        {usuarios.map((u, i) => (
          <div key={i} className="usuario-card">
            <img src={u.picture.medium} alt={`${u.name.first} ${u.name.last}`} />
            <p>{u.name.first} {u.name.last}</p>
            <button className="hablar-btn" onClick={() => handleHablar(u)}>Hablar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
