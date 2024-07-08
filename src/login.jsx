import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

 function Login() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos del formulario
    console.log('Username:', username);
    console.log('Password:', password);
  };

/*Funcion que lleva a la pantalla Panel, SEXOOOOOOOOO */
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/panel');
  };
  return (
    <div className="panel2">
    <div className="header2">
      <i className="icon-lock2"></i>
      <span>Login</span>
      
      
    </div>
    <div className="content2">
    <div className="login-container2">
      <h2>Inicio De Sesion</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group2">
          <label htmlFor="username">Nombre</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group2">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container2">
        <button className="submit" onClick={handleLoginClick}>Enviar</button>
        </div>
      </form>
      </div>
    </div>
  </div>
  );
}

export default Login;