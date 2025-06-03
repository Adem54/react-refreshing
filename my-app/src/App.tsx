import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name,setName] = useState("Adem");
  const [surname,setSurname] = useState("Erbas");

  return (
    <div className="App">
        <h2 className='xyz'>Welcome to React!</h2>
        <label htmlFor="">Name: </label> <span>{`my name is ${name}`}</span>
        <br />
        <label htmlFor="">SurName: </label> <span>{`my surname is ${surname}`}</span>

        
    </div>
  );
}

export default App;
