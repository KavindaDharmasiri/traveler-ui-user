import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './user/Context/Authprovider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
