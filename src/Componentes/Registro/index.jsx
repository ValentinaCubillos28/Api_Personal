import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    telefono: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);
    const { data, error: errorAuth } = await supabase.auth.signUp({
      email: formulario.correo,
      password: formulario.password,
    });

    if (errorAuth) {
      setError(errorAuth.message);
      return;
    }

    const uid = data.user.id;

    const { error: errorInsert } = await supabase.from("usuario").insert([
      {
        id: uid,
        nombre: formulario.nombre,
        correo: formulario.correo,
        fecha_nacimiento: formulario.fechaNacimiento,
        telefono: formulario.telefono,
        roll: "usuario",
      },
    ]);

    if (errorInsert) {
      setError("Usuario creado pero error en tabla usuarios: " + errorInsert.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">Registro</h2>
        <form className="registro-form" onSubmit={handleRegistro}>
          <input
            className="registro-input"
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
          <input
            className="registro-input"
            type="email"
            name="correo"
            placeholder="Correo"
            value={formulario.correo}
            onChange={handleChange}
            required
          />
          <input
            className="registro-input"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formulario.password}
            onChange={handleChange}
            required
          />
          <input
            className="registro-input"
            type="date"
            name="fechaNacimiento"
            value={formulario.fechaNacimiento}
            onChange={handleChange}
            required
          />
          <input
            className="registro-input"
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formulario.telefono}
            onChange={handleChange}
            required
          />
          <button className="registro-button" type="submit">
            Registrarse
          </button>
        </form>
        {error && <p className="registro-error">{error}</p>}
        <p className="registro-text">¿Ya tienes una cuenta?</p>
        <button className="registro-login-button" onClick={() => navigate(`/login`)}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Registro;
