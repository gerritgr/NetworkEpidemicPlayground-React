import Network from "./Network";
import Slider from "../Slider";

class Grid extends Network {
  constructor(){
    super("2D-Grid", []);
    this.state = {dimension: 3};
  }

  changeDimension = (e) => {
    let newD = e.target.value;
    if(newD < 1 || newD > 100){
      return;
    }
    this.setState({dimension: Number(newD)});

    //Update state
    this.props.updateGraphObject(this);
  }

  calculateGraph(){
    //We calculate our edgelist here
    this.graph = [];
    for(let i = 0; i < this.state.dimension * this.state.dimension; i++){
      if((i + 1) % this.state.dimension !== 0) {
        this.graph.push([i, i + 1]);
      }
      if(i < (this.state.dimension * this.state.dimension) - this.state.dimension) {
        this.graph.push([i, i + this.state.dimension]);
      }
    }
    return this.graph;
    //return edgeListToGraph(this.graph);
  }

  getGraph() {
    return this.calculateGraph();
  }

  render(){
    return (<div id='dimensionSlider'> <Slider description='Select a dimension' handleChange={this.changeDimension}
    min='2' max='12' currentValue={this.state.dimension}/> 
    </div>);
  }
}

export default Grid;
