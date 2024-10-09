import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Chatbot from '../components/Chatbot.jsx'
import Navbar from '../components/Navbar.jsx'
//import '../styles/index.css'
//import '../styles/App.css';
import '../styles/navbar.css';
import '../styles/ChatBot.css';

//had to make it's own css for chatbot because there were too many things interfering through index and app

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Chatbot />
  </StrictMode>,
)

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)