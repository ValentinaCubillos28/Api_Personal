import './style.css';

function Filtro({ onTipoChange }) {
  const tipos = [
    { label: "Todos", value: "all" },
    { label: "Mujeres", value: "female" },
    { label: "Hombres", value: "male" }
  ];

  return (
    <div className="c-filtro">
      {tipos.map((tipo, index) => (
        <button
          key={index}
          className="btn-filtro"
          onClick={() => onTipoChange(tipo.value)}
        >
          {tipo.label}
        </button>
      ))}
    </div>
  );
}

export default Filtro;

