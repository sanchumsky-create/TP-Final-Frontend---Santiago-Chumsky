import { createContext, useCallback, useContext, useState } from "react";
import { contact_list } from "../Components/Sidebar/models";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [contactos, setContactos] = useState(contact_list);

  const setMensajes = (chat_id, updater) => {
    setContactos((prevContactos) =>
      prevContactos.map((contacto) =>
        contacto.id === Number(chat_id)
          ? { ...contacto, mensajes: updater(contacto.mensajes) }
          : contacto,
      ),
    );
  };

  const enviarMensaje = (chat_id, texto) => {
    if (!texto || texto.trim() === "") return false;

    const ahora = new Date();
    const fecha = `${String(ahora.getHours()).padStart(2, "0")}:${String(
      ahora.getMinutes(),
    ).padStart(2, "0")}`;

    setMensajes(chat_id, (prevMensajes) => [
      ...prevMensajes,
      {
        contenido: texto,
        autor: "Yo",
        remitente: "yo",
        fecha,
        estatus_envio: "enviado",
      },
    ]);
    return true;
  };

  const marcarComoLeido = useCallback((chat_id) => {
    setContactos((prevContactos) =>
      prevContactos.map((contacto) =>
        contacto.id === Number(chat_id)
          ? { ...contacto, mensajes_sin_leer: 0 }
          : contacto,
      ),
    );
  }, []);

  const getContacto = (chat_id) =>
    contactos.find((contacto) => contacto.id === Number(chat_id)) ?? null;

  return (
    <ChatContext.Provider
      value={{
        contactos,
        setMensajes,
        enviarMensaje,
        marcarComoLeido,
        getContacto,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const contexto = useContext(ChatContext);
  if (!contexto) {
    throw new Error("useChat debe usarse dentro de un <ChatProvider>");
  }
  return contexto;
}
