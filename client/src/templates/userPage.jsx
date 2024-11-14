import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserPage from '../components/UserPage.jsx'
import Navbar from '../components/Navbar.jsx';
import './tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserPage />
  </StrictMode>,
)

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)