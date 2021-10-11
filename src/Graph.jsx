import { ForceGraph2D } from "react-force-graph";
import React from 'react';
import './css/Graph.css'

class DynamicGraph extends React.Component{
	constructor(props){
		super(props);
		this.fgRef = React.createRef();
		this.ran = false;
	}


	componentDidMount(){
		this.timerID = setInterval(()=>{
			//this.addNode();
			//this.fgRef.current.zoomToFit(400);
			//this.fgRef.current.resumeAnimation();
			//this.fgRef.current.pauseAnimation();
			//this.fgRef.current.cooldownTicks(10);
		}, 10000);
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	addNode(){
		if(this.state.nodes.length < 10){
			const id = this.state.nodes.length;
			const newNodes = this.state.nodes;
			const newLinks = this.state.links;
			newNodes.push({id:id});
			newLinks.push({source: id, target: Math.round(Math.random() * (id-1))});
			if(id > 0){
				newNodes[Math.round(Math.random() * (id-1))].color = "red";
			}
			//newNodes[0].color = "red";
			this.setState((nodes, links)=>({
				nodes: newNodes,
				links: newLinks
			}));
		}else{
			clearInterval(this.timerID);
		}
	}

	setCooldownTime(){
		if(!this.ran){
			this.ran = true;
			return 5000;
		}
		return 0;
	}

	onEngineStop(){
		console.log(this.fgRef.current)
		if(this.fgRef.current != null){
			this.fgRef.current.zoomToFit(4);
		}
	}

	render(){
			const data = {nodes: this.props.nodes, links: this.props.links};
			return <ForceGraph2D
				enableNodeDrag={false}
				graphData={data}
				ref={this.fgRef}
				cooldownTime={this.setCooldownTime()}
				onEngineStop={this.onEngineStop()}
        backgroundColor="black"
			/>;
	}
}

//const { useState, useEffect, useCallback } = React;
//
    //const DynamicGraph = () => {
      //const [data, setData] = useState({ nodes: [{ id: 0 }], links: [] });
//
      //useEffect(() => {
				//console.log(state);
				////if(this.state.nodes.length > 10){
					////return;
				////}
        //setInterval(() => {
          //// Add a new connected node every second
          //setData(({ nodes, links }) => {
            //const id = nodes.length;
						//nodes[0].color = "red";
						//console.log(nodes[0].color);
            //return {
              //nodes: [...nodes, { id }],
              //links: [...links, { source: id, target: Math.round(Math.random() * (id-1)) }]
            //};
          //});
        //}, 1000);
      //}, []);
//
      //const handleClick = useCallback(node => {
        //const { nodes, links } = data;
//
        //// Remove node on click
        //const newLinks = links.filter(l => l.source !== node && l.target !== node); // Remove links attached to node
        //const newNodes = nodes.slice();
        //newNodes.splice(node.id, 1); // Remove node
        //newNodes.forEach((n, idx) => { n.id = idx; }); // Reset node ids to array index
//
        //setData({ nodes: newNodes, links: newLinks });
      //}, [data, setData]);
//
      //return <ForceGraph2D
        //enableNodeDrag={false}
        //onNodeClick={handleClick}
        //graphData={data}
				//ndoeAutoColorBy={d => d.id%12}
      ///>;
    //};
//
//
export default DynamicGraph;
