import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UpdateMedia } from '../components/UpdateComponent.jsx'
import NavbarComponent from '../components/Navbar.jsx'
import './tailwind.css';

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <NavbarComponent />
  </StrictMode>,
)

createRoot(document.getElementById('update')).render(
  <StrictMode>
    <UpdateMedia />
  </StrictMode>,
)