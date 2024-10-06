import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CheckStatus from '../components/CheckStatus.jsx'
import '../index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CheckStatus />
  </StrictMode>,
)
