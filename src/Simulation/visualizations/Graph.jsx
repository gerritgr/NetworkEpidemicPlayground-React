import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Popup from 'reactjs-popup';
import '../../css/Graph.css';
import Slider from '../Slider';
import GIFGenerator from './GIFGenerator';
//import GIF from '@dhdbstjr98/gif.js';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    //this.props.animationLength = 101;
    this.cy = React.createRef();
    this.stepTime = 0;
    this.neverPlayed = true;
    this.state ={animationDuration: 4, step: 0, playing: false, gif: null};
  }

  componentDidMount() {
    //initial layout
    this.layoutGraph();
    this.setState({step: 0}, () => {
      //crop animation
      this.visualizeOneStep(false);
    });
  }

  componentDidUpdate(prevProps, _) {
    //only recalculate the layout if graph has changed
    if (prevProps.graphData !== this.props.graphData) {
      this.layoutGraph();
      this.setState({step: 0}, () => {
        //first crop the animation
        clearInterval(this.animationId);
        this.setState({playing: false});
        this.visualizeOneStep(false);
      });
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
      // Number of steps between consecutive screen positions update
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
      // Maximum number of steps to perform
      numIter: 1000,
      // Initial temperature (maximum node displacement)
      initialTemp: 1000,
      // Cooling factor (how the temperature is reduced between consecutive steps
      coolingFactor: 0.99,
      // Lower temperature threshold (below this point the layout will end)
      minTemp: 1.0
    };

    var layout = this.cy.layout( options );
    layout.run();
  }
  
  changeAnimationDuration = (e) => {
    this.setState({animationDuration: e.target.value,
      playing: false, step: 0
    }, () => {
      this.stepTime = Math.abs(this.state.animationDuration) * 1000 / this.props.animationLength;
      clearInterval(this.animationId);
      this.visualizeOneStep(false);
    });
  }
  
  visualizeSimulation = () => {
    if (this.state.playing) {
      clearInterval(this.animationId);
      this.setState({playing: false});
      return;
    } else if (this.state.step < this.props.animationLength && !this.neverPlayed) {
      this.animationId = setInterval(this.visualizeOneStep, this.stepTime);
      this.setState({playing: true});
      return;
    }
    console.log("here")
    this.neverPlayed = false;
    //check if we pause the animation
    clearInterval(this.animationId);
    this.setState({playing: false});
    //first we need to normalize the distribution
    //this.props.normalize();

    this.setState({step: 0}, () => {
      if (this.state.animationDuration <= 0) {
        this.setState({animationDuration: Math.abs(this.state.animationDuration)});
      }
      
      this.stepTime = (this.state.animationDuration) * 1000 / this.props.animationLength;
      this.animationId = setInterval(this.visualizeOneStep, this.stepTime);
      this.setState({playing: true});
      //update the button
      this.setState({});
    });
  }

  //this is the method to visualize the simulation
  visualizeOneStep = (increment = true) => {
    //the data of the simulation is stored in: this.props.simulationData
    var data = this.props.simulationData;
    if (data == null) {
      return;
    }
    if (this.state.step > this.props.animationLength) {
      this.finishAnimation();
      return;
      //this.setState({step: 0}, () => {
        //return;
      //});
    }

    //if this is null do not continue => bug
    if (this.props.colors == null || this.props.colors.length === 0) {
      console.log("no colors were given");
      return;
    }
    //array of all nodes
    let allNodes = this.cy.elements('node');
    //do one step
    for (var i = 0; i < allNodes.length; i++) {
      //the current state of the current node
      let state = data[this.state.step][i];
      var color = this.props.colors.find(element => element[0] === state)[1];

      this.cy.getElementById(allNodes[i].id()).style('background-color', color); }

    if (increment) {
      if (this.state.step < this.props.animationLength) {
        this.setState({step: this.state.step + 1});
      } else {
        this.finishAnimation();
      }
    } else {
      //update
      this.setState({});
    }
  }

  finishAnimation() {
    clearInterval(this.animationId);
    this.setState({playing: false, step: this.props.animationLength});
  }

  visualizeSpecificStep = (e) => {
    var val = Number(e.target.value);
    if (val < 0 || val > this.props.animationLength) {
      return;
    }
    //first stop the current animation
    clearInterval(this.animationId);
    this.setState({playing: false});
    this.setState({step: val}, () => {
      this.visualizeOneStep(false);
    });
  }


  render() {
    var playPauseString = "Play Simulation ▶️";
    if (this.state.playing) {
      playPauseString = "Stop Simulation ⏹️";
    }
    //show directed graph *or* chart
    //we want this to be a "tabbed" approach
    return (<div id="graphDiv">
      <button id="runSimulationButton" onClick={this.visualizeSimulation}>{playPauseString}</button>
      <Popup trigger={<button id="gifGeneratorButton">Generate GIF 📸</button>} modal>
        {close => (
        <div className="modal">
          <button className="close" onClick={() => {close()}} >&times;</button>
          <GIFGenerator setState={this.setState.bind(this)} state={this.state} visualizeOneStep={this.visualizeOneStep} animationLength={this.props.animationLength}/>
        </div>
      )}
      </Popup>
      <div id="durationWrapper">
        <h3 id="durationDescription">Duration (seconds): </h3>
        <input id="animationDuration" type="number" onChange={this.changeAnimationDuration} value={this.state.animationDuration}/>
      </div>
      <Slider description="Step" min="0" max={this.props.animationLength} currentValue={this.state.step} handleChange={this.visualizeSpecificStep}/>
      <CytoscapeComponent id="cy" userZoomingEnabled={false} userPanningEnabled={false}
      cy={(cy) => { this.cy = cy }} elements={this.props.graphData}/>


      </div>);
  }
}

export default Graph;
