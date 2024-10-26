import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CardComponent from '../components/App.jsx'
import NavbarComponent from '../components/Navbar.jsx'
import '../styles/tailwind.css'

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <NavbarComponent />
  </StrictMode>,
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardComponent />
  </StrictMode>,
)