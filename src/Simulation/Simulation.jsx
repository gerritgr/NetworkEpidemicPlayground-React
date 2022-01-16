import React from 'react';
import simulate from '../SimulationScripts/simulation.js'
import edgeListToGraph from '../SimulationScripts/graphUtils.js';

import '../css/Simulation.css'

import HorizonSelector from './HorizonSelector.jsx';
import ContactSelector from './ContactSelector.jsx';
import KarateClass from './exampleNetworks/Karate.jsx';
import ModelSelector from './ModelSelector.jsx';
import SIModel from './exampleModels/SIModel.jsx';
import Visual from './visualizations/Visual.jsx';

class Simulation extends React.Component{
	constructor(props){
		super(props);
		// bind this to the function as it is calles from elsewhere
		this.horizonChange = this.horizonChange.bind(this);
		this.networkChange = this.networkChange.bind(this);
		this.modelChanged = this.modelChanged.bind(this);
		this.recalculate = this.recalculate.bind(this);

    //HERE WE SET THE DEFAULT VALUES, THIS MUST BE CONSISTENT!!!!!
		this.networkObject = new KarateClass();
    this.modelObject = new SIModel();

    //initialize the state correctly
    var selectedModel = this.modelObject;
    var graphData = edgeListToGraph(this.networkObject.getGraph());
    var rules = selectedModel.getRules();
    var states = selectedModel.getStates();
    var initial_distribution = selectedModel.getDistribution();

    //we have to run the simulation once in the beginning... sadly componentWillUnmount is deprecated
    var newSimulationData = simulate(rules, states, initial_distribution, this.networkObject.getGraph(), 20.0);

		this.state = {rules: rules, states: states, initial_distribution: initial_distribution, graphData: graphData, horizon: 20.0, selectedNetwork: this.networkObject, selectedModel: this.modelObject, simulationData: newSimulationData,};
	}

	horizonChange(e){
		if(e.target.value > 200){
			e.target.value = 200
		}
		this.setState({
			horizon: e.target.value
		});
	}

	networkChange(newNetwork){
		this.setState({selectedNetwork: newNetwork});
	}

  modelChanged(newModel) {
    this.setState({selectedModel: newModel});
  }

 recalculate(){
    var selectedModel = this.state.selectedModel;
    var graphData = edgeListToGraph(this.state.selectedNetwork.getGraph());
    var rules = selectedModel.getRules();
    var states = selectedModel.getStates();
    var initial_distribution = selectedModel.getDistribution();

    //first check if the distribution is equal to ~1
    let sum = 0;
    initial_distribution.forEach((element) => {
      sum += element;
    });
    //check if the distribution is about 1
    if (sum < 0.95 || sum > 1.05) {
      return;
    }

    //update the values based on selected Models/Networks
    //Simulate with given data
    var newSimulationData = simulate(rules, states, initial_distribution, this.state.selectedNetwork.getGraph(), this.state.horizon);

    this.setState({graphData: graphData, rules: rules, states: states, initial_distribution: initial_distribution, simulationData: newSimulationData});

   //return a promise to be sure the data is saved
   return Promise.resolve("Done");
	}

	render(){
    return (
    <div id="Simulation">
      <div id="SimulationSettings">
        <HorizonSelector
        handleChange={this.horizonChange}
        currentValue={this.state.horizon}/>
        <ContactSelector handleChange={this.networkChange}/>
        <ModelSelector handleChange={this.modelChanged}/>
      </div>
      <div id="SimulationGraph">
        <Visual recalculateFuntion={this.recalculate}
        graphData={this.state.graphData} simulationData={this.state.simulationData} colors={this.state.selectedModel.getColors()} normalize={this.state.selectedModel.normalizeDistribution}/>
      </div>
    </div>
    );
	}
}
export default Simulation;
