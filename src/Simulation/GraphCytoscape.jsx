import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import '../css/Graph.css'

class GraphCytoscape extends React.Component {
  constructor(props) {
    super(props);
    this.cy = React.createRef();
    this.iteration = 0;
    this.state ={animationDuration: 4};
  }

  componentDidMount() {
    //initial layout
    this.layoutGraph();
    this.iteration = 0;
    this.visualizeOneStep();
  }

  componentDidUpdate(prevProps, prevState) {
    //only recalculate the layout if graph has changed
    if (prevProps.graphData !== this.props.graphData) {
      this.layoutGraph();
      this.iteration = 0;
      clearInterval(this.animationId);
      this.visualizeOneStep();
    }

    //we could check here if the simulation should start displaying
  }

  //layouting algorithm
  layoutGraph() {
    let options = {
      name: 'cose',
      // Called on `layoutready`
      ready: function(){},
      // Called on `layoutstop`
      stop: function(){},
      // Whether to animate while running the layout
      // true : Animate continuously as the layout is running
      // false : Just show the end result
      // 'end' : Animate with the end result, from the initial positions to the end positions
      animate: 'end',
      // Easing of the animation for animate:'end'
      animationEasing: undefined,
      // The duration of the animation for animate:'end'
      animationDuration: undefined,
      // A function that determines whether the node should be animated
      // All nodes animated by default on animate enabled
      // Non-animated nodes are positioned immediately when the layout starts
      animateFilter: function ( node, i ){ return true; },
      // The layout animates only after this many milliseconds for animate:true
      // (prevents flashing on fast runs)
      animationThreshold: 250,
      // Number of iterations between consecutive screen positions update
      refresh: 20,
      // Whether to fit the network view after when done
      fit: true,
      // Padding on fit
      padding: 30,
      // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      boundingBox: undefined,
      // Excludes the label when calculating node bounding boxes for the layout algorithm
      nodeDimensionsIncludeLabels: false,
      // Randomize the initial positions of the nodes (true) or use existing positions (false)
      randomize: false,
      // Extra spacing between components in non-compound graphs
      componentSpacing: 40,
      // Node repulsion (non overlapping) multiplier
      nodeRepulsion: function( node ){ return 2048; },
      // Node repulsion (overlapping) multiplier
      nodeOverlap: 4,
      // Ideal edge (non nested) length
      idealEdgeLength: function( edge ){ return 32; },
      // Divisor to compute edge forces
      edgeElasticity: function( edge ){ return 32; },
      // Nesting factor (multiplier) to compute ideal edge length for nested edges
      nestingFactor: 1.2,
      // Gravity force (constant)
      gravity: 1,
      // Maximum number of iterations to perform
      numIter: 1000,
      // Initial temperature (maximum node displacement)
      initialTemp: 1000,
      // Cooling factor (how the temperature is reduced between consecutive iterations
      coolingFactor: 0.99,
      // Lower temperature threshold (below this point the layout will end)
      minTemp: 1.0
    };

    var layout = this.cy.layout( options );
    layout.run();
  }
  
  changeAnimationDuration = (e) => {
    this.setState({animationDuration: e.target.value});
  }
  

  visualizeSimulation = () => {
    //check if we pause the animation
    console.log("new animation started");
    clearInterval(this.animationId);
    this.iteration = 0;
    if (this.state.animationDuration <= 0) {
      this.setState({animationDuration: 4});
    }
    this.visualizeOneStep();
    var stepTime = this.state.animationDuration * 1000 / this.props.simulationData.length;
    this.animationId = setInterval(this.visualizeOneStep, stepTime);
    //update the button
    this.setState({});
  }

  //this is the method to visualize the simulation
  visualizeOneStep = () => {
    //the data of the simulation is stored in: this.props.simulationData
    var data = this.props.simulationData;
    if (data == null) {
      return;
    }
    var simulationLength = data.length;
    if (this.iteration >= simulationLength) {
      console.log("finished animation");
      clearInterval(this.animationId);
      this.iteration = 0;
      this.setState({});
      return;
    }

    //array of all nodes
    let allNodes = this.cy.filter('node');
    //do one step
    for (var i = 0; i < allNodes.length; i++) {
      //the current state of the current node
      let state = data[this.iteration][i];
      var color = this.props.colors.find(element => element[0] === state)[1];

      this.cy.getElementById(allNodes[i].id()).style('background-color', color);
    }

    this.iteration++;
  }

  render() {
    return (<div id="graphDiv">
      <button id="recalculate" onClick={this.props.recalculateFuntion}>Recalculate 🔁</button>
      <button id="runSimulationButton" onClick={this.visualizeSimulation}>Play Simulation ▶️</button>
      <div>
      <h3 id="durationDescription">Duration (seconds): </h3>
      <input id="animationDuration" type="number" onChange={this.changeAnimationDuration} value={this.state.animationDuration}/>
      </div>
      <CytoscapeComponent id="cy" userZoomingEnabled={false} userPanningEnabled={false}
      cy={(cy) => { this.cy = cy }} elements={this.props.graphData}/>
      </div>);
  }
}

export default GraphCytoscape;
