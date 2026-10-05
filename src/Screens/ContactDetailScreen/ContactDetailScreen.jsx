import React, { useContext } from "react";
import { useParams } from "react-router";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import { contact_list } from "../../Components/Sidebar/models.js";

const ContactDetailScreen = () => {
  const { contact_id } = useParams();
  let contacto_seleccionado = null;
  for (const contacto of contact_list) {
    if (contacto.id === Number(contact_id)) contacto_seleccionado = contacto;
  }
  if (!contacto_seleccionado) {
    return (
      <div>
        <Sidebar />
        <div className="chat-vacio">Elegí un chat para empezar</div>
      </div>
    );
  }
  return (
    <div>
      <Sidebar />
      <h1>Informacion del contacto {contacto_seleccionado.nombre}</h1>
      <div>Numero: +54{contacto_seleccionado.numero} </div>
    </div>
  );
};
export default ContactDetailScreen;
