import React from "react";
import '../../css/Network.css'

class Network extends React.Component{
	constructor(optionName, graph){
		super()
    this.optionName = optionName;
		this.graph = graph;
	}

	//override default name getter
	get name(){
		return this.optionName;
	}

  getGraph() {
    return this.graph;
  }

  componentDidMount() {
    //update state on select
    this.props.updateGraphObject(this);
  }
}

export default Network;
