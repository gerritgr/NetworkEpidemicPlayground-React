import React from 'react';
import Chart from './Chart';
import Graph from './Graph';

//this component is the right side
class Visual extends React.Component {
  constructor(props) {
    super(props);
    this.cy = React.createRef();
    this.stepTime = 0;
    this.neverPlayed = true;
    this.state ={animationDuration: 4, step: 0, playing: false, animationLength: 100, newColors: null};
  }

  componentDidMount() {
    this.cropAnimation();
    this.setState({newColors: this.props.colors});
  }

  //remove steps where the animation does not change
  cropAnimation = () => {
    var data = this.props.simulationData.data;
    var lastState = data.length - 1;
    for (var i = data.length - 1; i > 0; i--) {
      //if (this.checkIfStatesAreEqual(data, lastState, i)) {
        //lastState = i;
      //}
      if (data[lastState] === data[i]) {
        lastState = i;
      }
    }
    this.setState({animationLength: lastState + 1})
    //this.animationLength = lastState + 1;
  }


  recalculate = () => {
    //normalize
    this.props.normalize();
    //then recalculate
    this.props.recalculateFuntion();
    //now crop
    this.cropAnimation();
    //update the colors for the chart
    this.setState({newColors: this.props.colors});
  }

  render() {
    //show directed graph *or* chart
    //we want this to be a "tabbed" approach
    //<Chart stateCounts={this.props.simulationData.stateCounts}/>
    return (<div id="graphDiv">
      <button id="recalculate" onClick={this.recalculate}>Recalculate 🔁</button>
      <Graph animationLength={this.state.animationLength} graphData={this.props.graphData} normalize={this.props.normalize} colors={this.props.colors} simulationData={this.props.simulationData.data}/>
      <div id="chart">
        <Chart stateCounts={this.props.simulationData.stateCounts} colors={this.state.newColors} animationLength={this.state.animationLength}/>
      </div>
      </div>);
  }
}

export default Visual;
