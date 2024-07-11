import React, { useState, useEffect } from 'react';
import './Login.css';
import background from './assets/bhp.png';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false); // Estado para manejar el mensaje de "Entrando..."
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      alert("Debe rellenar todos los campos");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://prod2-24.brazilsouth.logic.azure.com:443/workflows/dee3e41beb7242f58928d11c65d2470b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SPKH1WvfZzx6B9SrlwkXPXrbmbNGNJjJbFsEHbWvjLo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            method: "post",
            controller: "Login",
            data: `{user: '${username}', pwd: '${password}'}`
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        props.pushArea(
          data.areasPermitadas.map(i=> i.Value)
        )

        setLoading(false);
        setLoggingIn(true); // Muestra mensaje de "Entrando..."
        setTimeout(() => {
          props.changeScreen('Panel'); // Cambia de pantalla después de un breve retraso para mostrar el mensaje
        }, 2500); // Retraso de 2.5 segundos
      } else {
        console.error('Error en la solicitud:', response.statusText);
        alert("Contraseña Incorrecta");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert("Error en la solicitud.");
      setLoading(false);
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
          {loggingIn ? (
            <div className="entrando-message">Entrando...</div>
          ) : (
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
                <button type="submit" className="submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;