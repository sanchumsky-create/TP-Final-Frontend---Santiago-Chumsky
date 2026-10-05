import React, { useLayoutEffect, useState } from "react";
import { NavLink } from "react-router";
import ContactOption from "../ContactOptions/ContactOptions.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useChat } from "../../Context/ChatContext.jsx";

const Sidebar = () => {
  const { contactos } = useChat();
  const [busqueda, setBusqueda] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(
    () => localStorage.getItem("tema") === "oscuro",
  );
  useLayoutEffect(() => {
    document.body.dataset.tema = modoOscuro ? "oscuro" : "claro";
    localStorage.setItem("tema", modoOscuro ? "oscuro" : "claro");
  }, [modoOscuro]);

  if (contactos.length === 0) {
    return <span>No hay contactos registrados</span>;
  }

  const texto = busqueda.trim().toLowerCase();
  const contactos_filtrados = texto
    ? contactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(texto),
      )
    : contactos;

  const elegirModo = (oscuro) => {
    setModoOscuro(oscuro);
    setMenuAbierto(false);
  };

  return (
    <div className="sidebar">
      <SearchBar valor={busqueda} onChange={setBusqueda} />

      {contactos_filtrados.length === 0 ? (
        <p className="sin-resultados">El contacto que buscas no existe!</p>
      ) : (
        contactos_filtrados.map((contacto) => (
          <NavLink
            to={`/chat/${contacto.id}`}
            key={contacto.id}
            end
            className={({ isActive }) =>
              isActive ? "contacto-activo" : undefined
            }
          >
            <ContactOption
              id={contacto.id}
              imagen={contacto.imagen}
              ultimo_mensaje={contacto.ultimo_mensaje}
              nombre={contacto.nombre}
              mensajes_sin_leer={contacto.mensajes_sin_leer}
              fecha_ultimo_mensaje={contacto.fecha_ultimo_mensaje}
            />
          </NavLink>
        ))
      )}

      <div className="sidebar-pie">
        {menuAbierto && (
          <div className="sidebar-menu" role="menu">
            <button
              type="button"
              role="menuitem"
              className={modoOscuro ? "" : "activo"}
              onClick={() => elegirModo(false)}
            >
              Modo claro
            </button>
            <button
              type="button"
              role="menuitem"
              className={modoOscuro ? "activo" : ""}
              onClick={() => elegirModo(true)}
            >
              Modo oscuro
            </button>
          </div>
        )}

        <button
          type="button"
          className="sidebar-tuerca"
          aria-label="Configuración"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <img src="/tuerca.png" alt="" width={28} height={28} />
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
