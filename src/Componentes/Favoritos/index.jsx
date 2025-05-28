import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  if (favoritos.length === 0) {
    return <p className="c-favoritos-vacio">No hay favoritos aún.</p>;
  }

  return (
    <div className="c-lista-favoritos">
      {favoritos.map(user => (
        <div
          key={user.id}
          className="c-favorito"
          onClick={() => navigate(`/Perfil/${user.id}`, { state: { user } })}
        >
          <img src={user.foto} alt={`Perfil ${user.nombre}`} width="auto" height="60" loading="lazy" />
          <p>{user.nombre}</p>
        </div>
      ))}
    </div>
  );
}
