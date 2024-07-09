import React, { useState } from 'react';
import Login from './Login';  // Asegúrate de que esta ruta es correcta
import Panel from './Panel';

function App() {

  const [screen, setScreen] = useState("Login")

  const changeScreen = (screenName) =>{
    setScreen(screenName)
  }

  switch(screen){
    case 'Login': return(<Login changeScreen={changeScreen} />)
    case 'Panel': return(<Panel changeScreen={changeScreen} />)
  }
}

export default App;