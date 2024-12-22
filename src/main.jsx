import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Contextshare from './context/Contextshare.jsx'
import TokenAuth from './tokenAuth/TokenAuth.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenAuth>
  <Contextshare>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Contextshare>
    </TokenAuth>
  </StrictMode>,
)
