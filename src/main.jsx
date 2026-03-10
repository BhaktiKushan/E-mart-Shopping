import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </StrictMode>
  </BrowserRouter>
)
