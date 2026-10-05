import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";

const HomeScreen = () => {
  return (
    <div className="pantalla">
      <Sidebar />
      <div className="chat-vacio">Elegí un chat para empezar</div>
    </div>
  );
};
export default HomeScreen;
