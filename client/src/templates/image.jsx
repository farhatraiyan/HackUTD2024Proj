import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Image } from '../components/Image.jsx'
import NavbarComponent from '../components/Navbar.jsx'
import './tailwind.css';

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <NavbarComponent />
  </StrictMode>,
)

createRoot(document.getElementById('image')).render(
  <StrictMode>
    <Image />
  </StrictMode>,
)