import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos del formulario
    console.log('Username:', username);
    console.log('Password:', password);
  };
  return (
    <div className="panel">
    <div className="header">
      <i className="icon-lock"></i>
      <span>LOGIN</span>
      
      
    </div>
    <div className="content">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Nombre</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      </div>
    </div>
  </div>
  );
}

export default Login;