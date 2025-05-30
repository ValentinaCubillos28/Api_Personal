import { Link } from 'react-router-dom';
import './style.css';

function Menu() {
  return (
    <div className="menu-container">
      <nav className="c-menu">
        <Link to="/">Home</Link>
        <Link to="/Estadisticas">Explorar</Link>
        <Link to="/Contactos">Chat</Link>
        <Link to="/Favoritos">Likes</Link>
        <Link to="/adivina">Juego</Link>
        <Link to="/Usuario">Perfil</Link>
      </nav>
    </div>
  );
}

export default Menu;
