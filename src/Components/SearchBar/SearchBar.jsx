import React from "react";
import "./SearchBar.css";

export default function SearchBar({ valor, onChange }) {
  return (
    <div className="search-barra">
      <img
        className="search-logo"
        src="/wa-wordmark.svg"
        alt="WhatsApp"
        width={104}
        height={28}
      />
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Busca un chat o iniciar un nuevo chat"
      />
    </div>
  );
}
