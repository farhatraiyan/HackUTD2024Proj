import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UploadMedia } from '../components/UploadComponent.jsx'
import NavbarComponent from '../components/Navbar.jsx'
import './tailwind.css';

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <NavbarComponent />
  </StrictMode>,
)

createRoot(document.getElementById('upload')).render(
  <StrictMode>
    <UploadMedia />
  </StrictMode>,
)