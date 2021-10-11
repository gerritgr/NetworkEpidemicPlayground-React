import Network from "./Network";
import React from "react";

class Custom extends Network {
	constructor(){
    super("Custom",
    [[1,1], [2,1], [3,1], [4,1]]);
	}

	render(){
		return (<h1>Custom</h1>)
	}

}

export default Custom;
