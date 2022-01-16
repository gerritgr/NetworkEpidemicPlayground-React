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
    this.state ={animationDuration: 4, step: 0, playing: false, animationLength: 100, cachedColors: this.props.colors, cachedSimulationData: this.props.simulationData, cachedGraphData: this.props.graphData, currentView: "graph"};
  }

  componentDidMount() {
    this.cropAnimation();
    this.setState({
      cachedColors: this.props.colors,
      cachedSimulationData: this.props.simulationData,
      cachedGraphData: this.props.graphData
    });
  }

  //remove steps where the animation does not change
  cropAnimation = () => {
    var data = this.props.simulationData.data;
    var lastState = data.length - 1;
    for (var i = data.length - 1; i > 0; i--) {
      //if (this.checkIfStatesAreEqual(data, lastState, i)) {
        //lastState = i;
      //}
      //console.log(data[lastState], data[i])
      //console.log(data[lastState] === data[i])
      if (data[lastState] === data[i]) {
        lastState = i;
      }
    }
    this.setState({animationLength: lastState})
    //this.animationLength = lastState + 1;
  }


  recalculate = () => {
    //normalize
    this.props.normalize();
    //then recalculate
    this.props.recalculateFuntion().then(() => {
      //now crop
      this.cropAnimation();
      //we now update the cached data
      this.setState({
        cachedColors: this.props.colors,
        cachedSimulationData: this.props.simulationData,
        cachedGraphData: this.props.graphData
      });
    });
  }

  switchView = () => {
    if (this.state.currentView === "graph") {
      this.setState( {
        currentView: "chart"
      });
    } else {
      this.setState( {
        currentView: "graph"
      });
    }
  }

  showGraphOrChart = () => {
    if (this.state.currentView === "graph") {
      return (
        <Graph animationLength={this.state.animationLength} graphData={this.state.cachedGraphData} normalize={this.props.normalize} colors={this.state.cachedColors} simulationData={this.state.cachedSimulationData.data}/>
        );
    } else {
      return (
        <div id="chart">
          <Chart stateCounts={this.state.cachedSimulationData.stateCounts} timeSteps={this.state.cachedSimulationData.timeSteps} colors={this.state.cachedColors} animationLength={this.state.animationLength}/>
        </div>
        );
    }
  }

  render() {
    //show directed graph *or* chart
    //we want this to be a "tabbed" approach
    //<Chart stateCounts={this.props.simulationData.stateCounts}/>
    return (<div id="graphDiv">
      <button id="recalculate" onClick={this.recalculate}>Recalculate 🔁</button>
      <button id="switchView" onClick={this.switchView}>{this.state.currentView === "graph" ? "Show Chart 📈" : "Show Graph 📊"}</button>
      {this.showGraphOrChart()}
      </div>);
  }
}

export default Visual;
