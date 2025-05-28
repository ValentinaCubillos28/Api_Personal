import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../contexto/contexto';
import './style.css';

export default function Perfil() {
  const { favoritos, setFavoritos } = useContext(AppContext);
  const { state } = useLocation();
  const user = state?.user;  // Obtenemos el perfil completo desde el state

  if (!user) {
    return <p>Cargando datos del perfil...</p>;
  }

  const esFavorito = favoritos.some(fav => fav.id === user.id);

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(fav => fav.id !== user.id));
    } else {
      // Guardamos la info completa que queremos mostrar en Favoritos
      setFavoritos([...favoritos, { 
        id: user.id, 
        nombre: user.name, 
        foto: user.foto 
      }]);
    }
  };

  return (
    <div className="perfil-container">
      <img src={user.foto} alt={user.name} width="200" height="200" />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Teléfono: {user.telefono}</p>
      <p>Género: {user.gender}</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
