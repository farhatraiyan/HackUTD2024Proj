import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AboutPage from '../components/AboutPage.jsx'
import CardComponent from '../components/App.jsx'
import Navbar from '../components/Navbar.jsx'
import '../styles/tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardComponent />
  </StrictMode>,
)

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)