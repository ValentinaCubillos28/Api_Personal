import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from "react-router-dom";
import './login.css'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("Usuario o contraseña no válido");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">
            Iniciar sesión
          </button>
        </form>
        <p className="login-text">¿No tienes una cuenta?</p>
        <button className="register-button" onClick={() => navigate(`/registro`)}>
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Login;
