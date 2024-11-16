import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MediaId } from '../components/MediaId.jsx'
import NavbarComponent from '../components/Navbar.jsx'
import './tailwind.css';

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <NavbarComponent />
  </StrictMode>,
)

createRoot(document.getElementById('media-id')).render(
  <StrictMode>
    <MediaId />
  </StrictMode>,
)