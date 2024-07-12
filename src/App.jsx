import React, { useState } from 'react';
import Login from './Login';  // Asegúrate de que esta ruta es correcta
import Panel from './Panel';

function App() {

  const [screen, setScreen] = useState("Login")
  const [areas, setAreas] = useState([])
  const [user, setUser] = useState();

  const changeScreen = (screenName) =>{
    setScreen(screenName)
  }

  const pushArea = (areas) =>{
    let arr = []
    areas.forEach(element => {
      arr.push(element)
    });
    setAreas(arr)
    console.log(arr)
  }

  switch(screen){
    case 'Login': return(<Login changeScreen={changeScreen} pushArea={pushArea} setUser={setUser}/>)
    case 'Panel': return(<Panel changeScreen={changeScreen} areas={areas}   user={user} />)
  }
}

export default App;