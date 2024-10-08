import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CreateAccount from '../components/CreateAccount.jsx'
import Navbar from '../components/Navbar.jsx';
import '../styles/index.css'
import '../styles/App.css';
import '../styles/navbar.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreateAccount />
  </StrictMode>,
)

createRoot(document.getElementById('navbar')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)