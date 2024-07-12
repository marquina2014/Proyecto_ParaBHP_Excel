import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */ // Importa Bootstrap


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='Body'>
      <App />
      </div>
  </React.StrictMode>,
)
