import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CardComponent from '../components/App.jsx'
import Navbar from '../components/Navbar.jsx'
import './tailwind.css';

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