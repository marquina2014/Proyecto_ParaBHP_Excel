import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';  // Asegúrate de que esta ruta es correcta
import Panel from './Panel';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        
      </Routes>
    </Router>
  );
}

export default App;