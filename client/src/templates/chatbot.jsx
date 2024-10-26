import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Chatbot from '../components/Chatbot.jsx'
import Navbar from '../components/Navbar.jsx'
import '../styles/tailwind.css';

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