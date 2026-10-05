import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { ChatProvider } from "./Context/ChatContext.jsx";

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <ChatProvider>
    <App />
    </ChatProvider>
    </BrowserRouter>
)
