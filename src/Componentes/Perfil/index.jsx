import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../contexto/contexto';
import './style.css';

export default function Perfil() {
  const { favoritos, setFavoritos } = useContext(AppContext);
  const { state } = useLocation();
  const user = state?.user;  // Obtenemos el perfil completo desde el state

  if (!user) {
    return <p className="cargando">Cargando datos del perfil...</p>;
  }

  const esFavorito = favoritos.some(fav => fav.id === user.id);

const toggleFavorito = () => {
  if (esFavorito) {
    setFavoritos(favoritos.filter(fav => fav.id !== user.id));
  } else {
    setFavoritos([...favoritos, {
      id: user.id,
      nombre: user.name,
      foto: user.foto,
      email: user.email,
      telefono: user.telefono,
      gender: user.gender
    }]);
  }
};

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <img src={user.foto} alt={user.name} className="perfil-foto" />
       <h2>{user.nombre || user.name}</h2>
{user.email && <p>Email: {user.email}</p>}
{user.telefono && <p>Teléfono: {user.telefono}</p>}
{user.gender && <p>Género: {user.gender}</p>}

        <button onClick={toggleFavorito} className="btn-favorito">
          {esFavorito ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}
