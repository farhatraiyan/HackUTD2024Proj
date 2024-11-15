import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ViewMedia } from '../components/MediaComponent.jsx'
import NavbarComponent from '../components/Navbar.jsx'
import './tailwind.css';

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <NavbarComponent />
  </StrictMode>,
)

createRoot(document.getElementById('media')).render(
  <StrictMode>
    <ViewMedia />
  </StrictMode>,
)