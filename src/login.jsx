import React, { useState } from 'react';
import './Login.css';
import background from './assets/bhp.png'

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userName = "admin"; // Username 
  const passwordCorrect = '1234'; // Password 

  const handleSubmit = (e) => {
    e.preventDefault();
    //valida que los campos no esten vacios
    if(username === '' || password === ''){
      alert("Debe rellenar todos los campos")
    }
    
    else if(username === userName && password === passwordCorrect){
      alert("Si es la Contraseña");
      props.changeScreen('Panel')
  
    // Aquí puedes manejar el envío de los datos del formulario
    console.log('Username:', username);
    console.log('Password:', password);
  }
  else{
    alert("Contraseña Incorrecta chaval, escribela bien");
  }

  };

  return (
    <div className="panel2"
      style={{
        backgroundImage: `URL(${background})`
      }}
    >
    <div className="header2">
      <i className="icon-lock2"></i>
      <span>Login</span>
      
      
    </div>
    <div className="content2">
    <div className="login-container2">
      <h2>Inicio De Sesión</h2>
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
        <button className="submit" onClick={handleSubmit}>Enviar</button>
        </div>
      </form>
      </div>
    </div>
  </div>
  );
}

export default Login;