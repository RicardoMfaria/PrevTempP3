import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/fluent-light/theme.css'
import 'primeflex/primeflex.css'
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
