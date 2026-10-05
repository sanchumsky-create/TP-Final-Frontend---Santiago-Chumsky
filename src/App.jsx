import "./Style/StyleGlobal.css";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
/* import ContactDetailScreen from "./Screens/ContactDetailScreen/ContactDetailScreen"; */
import ChatScreen from "./Screens/ChatScreen/ChatScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      {/*  <Route path="/contact/:contact_id" element={<ContactDetailScreen />} /> */}
      <Route path="/chat/:chat_id" element={<ChatScreen />} />
    </Routes>
  );
}
