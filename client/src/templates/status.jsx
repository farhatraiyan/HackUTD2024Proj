import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CheckStatus from '../components/CheckStatus.jsx'
import Navbar from '../components/Navbar.jsx'
import './tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CheckStatus />
  </StrictMode>,
)

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)