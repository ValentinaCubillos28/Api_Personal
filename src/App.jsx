import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';
import { supabase } from './supabase';

import './App.css'
import Contactos from './Componentes/Contactos'
import Perfil from './Componentes/Perfil'
import Estadisticas from './Componentes/Estadisticas'
import Inicio from './Componentes/Inicio'
import Menu from './Componentes/Menu';
import Footer from './Componentes/Footer';
import Favoritos from './Componentes/Favoritos';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Usuario from './Componentes/Usuario';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}
        <Routes>

          <Route path="/" element={usuario ? <Inicio /> : <Navigate to="/login" />} />
          <Route path="/Perfil/:name" element={usuario ? <Perfil /> : <Navigate to="/login" />} />
          <Route path="/Usuario/:name" element={usuario ? <Usuario /> : <Navigate to="/login" />} />
          <Route path="/Contactos" element={usuario ? <Contactos /> : <Navigate to="/login" />} />
          <Route path="/Estadisticas" element={usuario ? <Estadisticas /> : <Navigate to="/login" />} />
          <Route path="/Favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
        </Routes>

        {usuario && <Footer />}
      </Router>
    </AppProvider>
  );
}

export default App;
