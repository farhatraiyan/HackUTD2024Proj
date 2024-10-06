import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../components/App.jsx'
import Navbar from '../components/Navbar.jsx'
import '../styles/index.css'
import '../styles/App.css';
import '../styles/navbar.css';

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)