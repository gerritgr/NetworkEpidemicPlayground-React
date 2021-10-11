import React from 'react';
import DynamicGraph from './Graph.jsx';
import simulate from './SimulationScripts/simulation.js'
import edgeListToGraph from './SimulationScripts/graphUtils.js';

class Simulation extends React.Component{
	constructor(props){
		super(props);
		//this.graph = React.createRef();
		
		//Example data
		let rules = [[ "I", "R", 1 ], // spontaneous rule  I -> R with rate 1.0
				[ "R", "S", 0.7 ],  // spontaneous rule R -> S with rate 0.7
				[ [ "I","S","I" ],[ "I","I","I" ], 0.8 ]]; // contact rule I+S -> I+I with rate 0.8
		let states = ["S", "I", "R"];
		let initial_distribution = [0.5, 0.5, 0.0]; // gleiche Reihenfolge wie states, musss zu rules passen und normalisiert werden
		//end of example data


		let graph_as_edgelist = [[ 0, 4 ], [ 0, 1 ], [ 1, 5 ], [ 1, 2 ], [ 2, 6 ], [ 2, 3 ], [ 3, 7 ], [ 4, 8 ], [ 4, 5 ], [ 5, 9 ], [ 5, 6 ], [ 6, 10 ], [ 6, 7 ], [ 7, 11 ], [ 8, 12 ], [ 8, 9 ], [ 9, 13 ], [ 9, 10 ], [ 10, 14 ], [ 10, 11 ], [ 11, 15 ], [ 12, 13 ], [ 13, 14 ], [ 14, 15 ]];
		let horizon = 20.0;
		let simulationData = simulate(rules, states, initial_distribution, graph_as_edgelist, horizon);


		let graphData = edgeListToGraph(graph_as_edgelist);
		this.state = {rules: rules, states:states, initial_distribution: initial_distribution, simulationData: simulationData, graphData: graphData};
		//this.graph.current.test("alksdj");
	}

	componentDidMount(){
		//this.id = setInterval(() => {
			//this.setState((prev)=>{
				//prev.graphData.nodes[Math.round(Math.random() * (prev.graphData.nodes.length - 1))].color = "red";
				//return prev;
			//})
		//},1000)
	}

	componentWillUnmount(){
		clearTimeout(this.id);
	}

	test(e){
		console.log(e.target.value);
	}

	render(){
		return (
		<div id="Simulation">
			<DynamicGraph
			nodes={this.state.graphData.nodes}
		links={this.state.graphData.links}/>
		</div>
		);
	}
}
export default Simulation;
