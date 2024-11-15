import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SignIn from '../components/SignIn.jsx'
import Navbar from '../components/Navbar.jsx';
import './tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
)

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)