import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';

export default function Contactos() {
  const location = useLocation();
  const usuario = location.state?.usuario;
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState('');
  const indexRef = useRef(0);

  const respuestas = [
    'Hola, ¿cómo estás?',
    'Cuéntame sobre ti...',
    'Interesante, cuéntame más...',
    'Interesante, cuéntame más...',
    'Genial, hablemos después',
    'Adiós'
  ];

  useEffect(() => {
    if (usuario) {
      setMensajes([
        { from: 'bot', text: `Hola, soy ${usuario.name.first}. ¿En qué puedo ayudarte?` }
      ]);
    }
  }, [usuario]);

  function enviarMensaje() {
    if (!input.trim()) return;
    setMensajes(prev => [...prev, { from: 'yo', text: input }]);
    setInput('');

    setTimeout(() => {
      const respuesta = respuestas[indexRef.current];
      indexRef.current = (indexRef.current + 1) % respuestas.length;
      setMensajes(prev => [...prev, { from: 'bot', text: respuesta }]);
    }, 1000);
  }

  if (!usuario) return <p>No se ha seleccionado ningún usuario. Vuelve a Explorar para elegir uno.</p>;

  return (
    <div className="chat-container">
      <h3>Chat con {usuario.name.first}</h3>
      <div id="chat-box" className="chat-box">
        {mensajes.map((m, i) => (
          <p
            key={i}
            className={m.from === 'yo' ? 'mensaje mensaje-yo' : 'mensaje mensaje-bot'}
          >
            <strong>{m.from === 'yo' ? 'Tú' : usuario.name.first}:</strong> {m.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        className="chat-input"
        placeholder="Escribe tu mensaje..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') enviarMensaje(); }}
      />
      <button onClick={enviarMensaje} className="chat-button">Enviar</button>
    </div>
  );
}
