//import logo from './logo.svg';
import './css/App.css';
import React from 'react';
import Simulation from './Simulation/Simulation.jsx';
import HeaderData from './Header/Headerdata';


function App() {
  return (
    <div className="App">
			<HeaderData/>
			<Simulation/>
    </div>
  );
}

export default App;
