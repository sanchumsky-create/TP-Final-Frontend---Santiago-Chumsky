import React from "react";

export default function ContactOption(propiedades) {
  return (
    <div className="contacto-fila">
      <div className="imagen-contacto-container">
        <img
          src={propiedades.imagen}
          alt={propiedades.nombre}
          className="imagen-contacto"
        />
      </div>

      <div className="contacto-info">
        <h2>{propiedades.nombre}</h2>
        <p>{propiedades.ultimo_mensaje}</p>
      </div>

      <div className="contacto-meta">
        <span className="contacto-hora">
          {propiedades.fecha_ultimo_mensaje}
        </span>
        {propiedades.mensajes_sin_leer > 0 && (
          <span className="badge-sin-leer">{propiedades.mensajes_sin_leer}</span>
        )}
      </div>
    </div>
  );
}
