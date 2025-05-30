// Configuracion.jsx
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexto/contexto';
import './style.css';

export default function Configuracion() {
  const { usuarioSeleccionado } = useContext(AppContext);
  const [compatibilidad, setCompatibilidad] = useState(0);

  useEffect(() => {
    if (usuarioSeleccionado) {
      const porcentaje = Math.floor(Math.random() * 101);
      setCompatibilidad(porcentaje);
    }
  }, [usuarioSeleccionado]);

  if (!usuarioSeleccionado) {
    return (
      <div className="configuracion-page">
        <p className="mensaje-error">
          No hay usuario seleccionado. Ve a Explorar y selecciona uno.
        </p>
      </div>
    );
  }

  return (
    <div className="configuracion-page">
      <div className="configuracion-container">
        <h2>Perfil Seleccionado</h2>
        <div className="perfil-card">
          <img
            src={usuarioSeleccionado.picture?.large || usuarioSeleccionado.foto}
            alt="foto"
          />
          <h3>
            {usuarioSeleccionado.name?.first || usuarioSeleccionado.nombre}{' '}
            {usuarioSeleccionado.name?.last || ''}
          </h3>
          <p>Email: {usuarioSeleccionado.email}</p>
        </div>

        <div className="barra-compatibilidad">
          <div className="barra-llena" style={{ width: `${compatibilidad}%` }}></div>
        </div>
        <p className="porcentaje-texto">{compatibilidad}% de compatibilidad</p>
      </div>
    </div>
  );
}
