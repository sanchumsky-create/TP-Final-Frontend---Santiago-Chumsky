import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";
import "./ChatScreen.css";

const esMio = (mensaje) => mensaje.autor === "Yo" || mensaje.remitente === "yo";

const ChatScreen = () => {
  const { chat_id } = useParams();
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const { getContacto, enviarMensaje, marcarComoLeido } = useChat();

  useEffect(() => {
    marcarComoLeido(chat_id);
  }, [chat_id, marcarComoLeido]);

  const contacto_seleccionado = getContacto(chat_id);

  if (!contacto_seleccionado) {
    return (
      <div className="chat-contenedor">
        <Sidebar />
        <div className="chat-vacio">Elegí un chat para empezar</div>
      </div>
    );
  }

  const manejarEnvio = () => {
    if (enviarMensaje(chat_id, nuevoMensaje)) setNuevoMensaje("");
  };

  return (
    <div className="chat-contenedor">
      <Sidebar />
      <div className="chat-messages">
        <div className="chat-cabecera">
          <h1>{contacto_seleccionado.nombre}</h1>
        </div>
        <div className="chat-messages-lista">
          {contacto_seleccionado.mensajes.map((mensaje, index) => {
            const mio = esMio(mensaje);
            const visto = mensaje.estatus_envio === "visto";
            return (
              <p
                key={index}
                className={mio ? "mensaje mio" : "mensaje contacto"}
              >
                <span className="mensaje-texto">{mensaje.contenido}</span>
                <span className="mensaje-meta">
                  {mensaje.fecha && <time>{mensaje.fecha}</time>}
                  {mio && mensaje.estatus_envio && (
                    <span
                      className={
                        visto ? "mensaje-estado visto" : "mensaje-estado"
                      }
                    >
                      {visto ? "✓✓" : "✓"}
                    </span>
                  )}
                </span>
              </p>
            );
          })}
        </div>
        <div className="chat-barra">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && manejarEnvio()}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={manejarEnvio}>Enviar</button>
        </div>
      </div>
    </div>
  );
};
export default ChatScreen;
