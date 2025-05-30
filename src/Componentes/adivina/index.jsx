import React, { useEffect, useState } from "react";
import "./style.css";

const preguntas = [
  {
    id: "gender",
    texto: "¿Es mujer?",
    preguntaUsuarioSecreto: (user) => user.gender === "female",
  },
  {
    id: "age",
    texto: "¿Tiene más de 30 años?",
    preguntaUsuarioSecreto: (user) => user.dob.age > 30,
  },
  {
    id: "hairBlonde",
    texto: "¿Tiene el pelo rubio?",
    preguntaUsuarioSecreto: (user) => {
      const hairColors = ["blonde", "brown", "black", "red"];
      const seed = user.login.username || "";
      const index = seed.charCodeAt(0) % hairColors.length;
      return hairColors[index] === "blonde";
    },
  },
  {
    id: "hairBrown",
    texto: "¿Tiene el pelo castaño?",
    preguntaUsuarioSecreto: (user) => {
      const hairColors = ["blonde", "brown", "black", "red"];
      const seed = user.login.username || "";
      const index = seed.charCodeAt(0) % hairColors.length;
      return hairColors[index] === "brown";
    },
  },
  {
    id: "hairBlack",
    texto: "¿Tiene el pelo negro?",
    preguntaUsuarioSecreto: (user) => {
      const hairColors = ["blonde", "brown", "black", "red"];
      const seed = user.login.username || "";
      const index = seed.charCodeAt(0) % hairColors.length;
      return hairColors[index] === "black";
    },
  },
  {
    id: "hairRed",
    texto: "¿Tiene el pelo rojo?",
    preguntaUsuarioSecreto: (user) => {
      const hairColors = ["blonde", "brown", "black", "red"];
      const seed = user.login.username || "";
      const index = seed.charCodeAt(0) % hairColors.length;
      return hairColors[index] === "red";
    },
  },
  {
    id: "wearsGlasses",
    texto: "¿Usa gafas?",
    preguntaUsuarioSecreto: (user) => {
      if (!user.id?.value) return false;
      const lastChar = user.id.value.slice(-1);
      return !isNaN(lastChar) && parseInt(lastChar) % 2 === 0;
    },
  },
];

export default function AdivinaQuien() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosVisibles, setUsuariosVisibles] = useState([]);
  const [usuarioSecreto, setUsuarioSecreto] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [historialPreguntas, setHistorialPreguntas] = useState([]);
  const [resultado, setResultado] = useState(null); // "ganaste" | "perdiste" | null

  useEffect(() => {
    cargarJuego();
  }, []);

  function cargarJuego() {
    fetch("https://randomuser.me/api/?results=12")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data.results);
        setUsuariosVisibles(data.results);
        const secreto = data.results[Math.floor(Math.random() * data.results.length)];
        setUsuarioSecreto(secreto);
        setMensaje("");
        setJuegoTerminado(false);
        setHistorialPreguntas([]);
        setResultado(null);
      })
      .catch((e) => console.error("Error al cargar usuarios:", e));
  }

  function responderPregunta(pregunta) {
    if (juegoTerminado) return;

    const respuesta = pregunta.preguntaUsuarioSecreto(usuarioSecreto);

    setMensaje(
      `Respuesta: ${respuesta ? "Sí" : "No"} a "${pregunta.texto}"`
    );

    setHistorialPreguntas((prev) => [
      ...prev,
      { texto: pregunta.texto, respuesta: respuesta ? "Sí" : "No" },
    ]);

    setUsuariosVisibles((prev) =>
      prev.filter((u) => {
        const cumple = pregunta.preguntaUsuarioSecreto(u);
        return respuesta ? cumple : !cumple;
      })
    );
  }

  function intentarAdivinar(usuario) {
    if (juegoTerminado) return;

    if (usuario.login.uuid === usuarioSecreto.login.uuid) {
      setMensaje(`¡Correcto! Has adivinado a ${usuario.name.first} ${usuario.name.last}`);
      setResultado("ganaste");
    } else {
      setMensaje(`Incorrecto. Ese no es el usuario secreto.`);
      setResultado("perdiste");
    }
    setJuegoTerminado(true);
  }

  function reiniciarJuego() {
    cargarJuego();
  }

  if (!usuarioSecreto) return <p>Cargando usuarios...</p>;

  return (
    <div className="adivina-quien">
      <h2 className="titulo">Juego: Adivina Quién</h2>

      <p className="instruccion">Haz preguntas para descubrir quién es el usuario secreto.</p>

      <div className="botones-preguntas">
        {preguntas.map((p) => (
          <button
            key={p.id}
            onClick={() => responderPregunta(p)}
            disabled={juegoTerminado}
            className="btn-pregunta"
          >
            {p.texto}
          </button>
        ))}
      </div>

      <p className="mensaje-respuesta"><strong>{mensaje}</strong></p>

      <div className="historial-preguntas">
        <h4>Preguntas hechas:</h4>
        {historialPreguntas.length === 0 && <p>No has hecho preguntas aún.</p>}
        <ul>
          {historialPreguntas.map((item, i) => (
            <li key={i}>
              {item.texto} — <strong>{item.respuesta}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="lista-usuarios">
        {usuariosVisibles.map((u) => (
          <div
            key={u.login.uuid}
            onClick={() => intentarAdivinar(u)}
            className={`usuario-card ${juegoTerminado ? "deshabilitado" : ""}`}
            title="Haz click para adivinar"
          >
            <img
              src={u.picture.medium}
              alt={`${u.name.first} ${u.name.last}`}
              className="usuario-foto"
            />
            <p className="usuario-nombre">
              {u.name.first} {u.name.last}
            </p>
          </div>
        ))}
      </div>

      {juegoTerminado && (
        <div className="resultado-juego">
          <p className={`mensaje-resultado ${resultado === "ganaste" ? "ganaste" : "perdiste"}`}>
            {resultado === "ganaste"
              ? "🎉 ¡Felicidades, ganaste!"
              : "😞 Lo siento, perdiste."}
          </p>
          <button onClick={reiniciarJuego} className="btn-reiniciar">
            Reiniciar juego
          </button>
        </div>
      )}
    </div>
  );
}
