import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
  const [favoritos, setFavoritos] = useState(favoritosGuardados);

  const [data, setData] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('all');

  useEffect(() => {
    const obtenerDatos = async () => {
      const url = tipoSeleccionado === 'all'
        ? 'https://randomuser.me/api/?results=20'
        : `https://randomuser.me/api/?results=20&gender=${tipoSeleccionado}`;

      try {
        const res = await fetch(url);
        const json = await res.json();

        const datosAdaptados = json.results.map((item) => ({
          id: item.login.uuid,
          nombre: `${item.name.first} ${item.name.last}`,
          email: item.email,
          telefono: item.phone,
          foto: item.picture.large,
          gender: item.gender,
        }));

        setData(datosAdaptados);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Agrega usuario a favoritos (sin duplicados)
  function agregarAFavoritos(user) {
    setFavoritos(prev => {
      if (prev.find(fav => fav.id === user.id)) return prev;
      return [...prev, user];
    });
  }

  // Quita usuario de favoritos
  function quitarFavorito(userId) {
    setFavoritos(prev => prev.filter(fav => fav.id !== userId));
  }

  // Toggle favorito
  function toggleFavorito(user) {
    const existe = favoritos.find(fav => fav.id === user.id);
    if (existe) {
      quitarFavorito(user.id);
    } else {
      agregarAFavoritos(user);
    }
  }

  return (
    <AppContext.Provider value={{
      favoritos,
      setFavoritos,
      agregarAFavoritos,
      quitarFavorito,
      toggleFavorito,
      data,
      setData,
      tipoSeleccionado,
      setTipoSeleccionado
    }}>
      {children}
    </AppContext.Provider>
  );
}
