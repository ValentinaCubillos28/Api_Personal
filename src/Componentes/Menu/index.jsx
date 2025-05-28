import { Link } from 'react-router-dom';
import './style.css';

function Menu() {
  return (
    <nav className="c-menu">
      <Link to="/">Home</Link>
      
      <Link to="/Estadisticas">Explorar</Link>
      <Link to="/Contactos">Chat</Link>
      <Link to="/Favoritos">Likes</Link>
      <Link to="/Usuario">Perfil</Link>
    </nav>
  );
}

export default Menu;
