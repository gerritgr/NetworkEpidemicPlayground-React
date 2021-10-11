import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

class Graph extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nodes:[
				{ id: 1, label: "Node 1" },
				{ id: 2, label: "Node 2" },
				{ id: 3, label: "Node 3" },
				{ id: 4, label: "Node 4" },
				{ id: 5, label: "Node 5" },
			],
			edges:[
				{ from: 1, to: 3 },
				{ from: 1, to: 2 },
				{ from: 2, to: 4 },
				{ from: 2, to: 5 },
				{ from: 3, to: 3 },
			]
		}
	}
	componentDidMount(){
		this.id = setInterval(()=>this.tick(), 1000);
	}
	componentWillUnmount(){
		clearInterval(this.id);
	}
	tick(){
		if(this.state.nodes[0].label === "Node 1"){
			var copy = this.state;
			copy.nodes[0].label = "TEUZET";
			this.setState(copy)
		}else{
			var copy = this.state;
			copy.nodes[0].label = "Node 1";
			this.setState(copy)
		}
	}
	render(){
		console.log(this.state);
		return (<VisNetwork inp={this.state}/>)
	}
}

function VisNetwork(inp) {
	const visJsRef = useRef(false);
	var nodes = inp.inp.nodes;
	var edges = inp.inp.edges;
	useEffect(() => {
			visJsRef.current.graph = new Network(visJsRef.current, { nodes, edges }, {});
		// Use `network` here to configure events, etc
	}, [visJsRef, nodes, edges]);

	//redraw the graph
	if(visJsRef.current.graph != null){
		console.log("red")
		visJsRef.current.graph.redraw();
	}
	return <div ref={visJsRef} />;
};

export default Graph;
