import '../App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CreateAccount from '../components/CreateAccount.jsx'
import '../index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreateAccount />
  </StrictMode>,
)
