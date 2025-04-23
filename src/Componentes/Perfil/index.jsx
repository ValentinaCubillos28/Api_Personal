import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; 
import './style.css';

function Perfil() {
  const [datapoke, setDatapoke] = useState(null);
  const { name } = useParams(); 
  const [favoritos, setFavoritos] = useState(() => {
    const favs = localStorage.getItem("favoritos");
    return favs ? JSON.parse(favs) : [];
  });

  useEffect(() => {
    const perfiles = JSON.parse(localStorage.getItem("perfiles")) || [];
    const perfilEncontrado = perfiles.find(p => p.id === name);
    setDatapoke(perfilEncontrado);
  }, [name]);

  const esFavorito = favoritos.some(p => p.id === datapoke?.id);

  const toggleFavorito = () => {
    let nuevosFavoritos;
    if (esFavorito) {
      nuevosFavoritos = favoritos.filter(p => p.id !== datapoke.id);
    } else {
      nuevosFavoritos = [...favoritos, { id: datapoke.id, name: datapoke.name }];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  if (!datapoke) return <p>Cargando...</p>;

  return (
    <div>
      <img 
        src={datapoke.foto} 
        alt={datapoke.name} 
        width="200"
      />
      <p>{datapoke.name}</p>
      <p>{datapoke.id}</p>
      <p>Email: {datapoke.email}</p>
      <p>Teléfono: {datapoke.telefono}</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default Perfil;

