import React from 'react';
import '../css/Header.css';

class HeaderData extends React.Component{
	render(){
		return (
      <div>
        <h1>Network Epidemic Playground</h1>
        <h2>Continuous-time stochastic simulation of epidemic spreading on human-to-human contact networks</h2>
        <h3 id="credits">Simulation developed by <a href="https://mosi.uni-saarland.de/people/gerrit/" target="_blank" rel="noreferrer">Gerrit</a>, website developed by <a href="https://juliusherrmann.de" target="_blank" rel="noreferrer">Julius Herrmann</a></h3>
      </div>
		);
	}
}

export default HeaderData;
