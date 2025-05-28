
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';
import Filtro from '../Filtro';

function Inicio() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('all');

  useEffect(() => {
    const obtenerDatos = async () => {
      setLoading(true);

      const url = tipoSeleccionado === 'all'
        ? 'https://randomuser.me/api/?results=20'
        : `https://randomuser.me/api/?results=20&gender=${tipoSeleccionado}`;

      try {
        const res = await fetch(url);
        const json = await res.json();

        const datosAdaptados = json.results.map((item) => ({
          id: item.login.uuid,
          name: `${item.name.first} ${item.name.last}`,
          email: item.email,
          telefono: item.phone,
          foto: item.picture.large,
          gender: item.gender
        }));

        setData(datosAdaptados);
        localStorage.setItem("perfiles", JSON.stringify(datosAdaptados));
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  let resultados = data;

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter(perfil =>
      perfil.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }<br></br>

  if (!isNaN(busqueda)) {
    resultados = data.filter(perfil =>
      perfil.id.includes(busqueda)
    );
  }

  return (
    <>
      <br /><br />
      <input
        type="text"
        placeholder="Buscar"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      /><br></br>

      <Filtro onTipoChange={handleTipoChange} />

      {loading ? (
        <p className="loading">Cargando usuarios...</p>
      ) : (
        <section className='c-Inicio'>
          {resultados.map((perfil, index) => (
            <div
              className='c-Inicio-Perfil'
              onClick={() => navigate(`/Perfil/${perfil.id}`, { state: { user: perfil } })}
              key={index}
            >
              <img
                src={perfil.foto}
                alt={`Perfil ${perfil.name}`}
                width='auto'
                height='60'
                loading='lazy'
              />
              <p>{perfil.name}</p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default Inicio;
