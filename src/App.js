//import logo from './logo.svg';
import './css/App.css';
import React from 'react';
import Simulation from './Simulation/Simulation.jsx';
import HeaderData from './Header/Headerdata';


function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/> 
      <HeaderData/>
      <Simulation/>
    </div>
  );
}

export default App;
