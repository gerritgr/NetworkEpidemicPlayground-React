import Network from "./Network";
import React from "react";

class Custom extends Network {
	constructor(){
    super("Custom",
    [[1,1], [2,1], [3,1], [4,1]]);
    this.state = {input: ""};
	}

  textFieldChanged = (e) => {
    let newText = e.target.value;
    this.setState({input: newText});
  }

  getGraph() {
    return this.parseInput(this.state.input);
  }

  parseInput(input) {
    //first we clean the input using a regex
    let re = /[([]{1}\s*([0-9]*)\s*,\s*[0-9]+\s*[)\]]{1}/g;
    let cleaned = input.match(re);
    let output = [];

    //strip spaces, tabs and newlines
    input = input.replaceAll(" ", "");
    input = input.replaceAll("\t", "");
    input = input.replaceAll("\n", "");

    //we now match each single number and put it in our output
    re = /[0-9]+/g;
    if (cleaned == null) {
      return [];
    }
    cleaned.forEach((element) => {
      let newEntry = element.match(re);
      //convert to numbers
      newEntry[0] = Number(newEntry[0]);
      newEntry[1] = Number(newEntry[1]);
      output.push(newEntry);
    });

    console.log(output);
    return output;
  }

	render(){
    return (<div>
      <h3 className="CustomHeader">Enter an edgelist like: <code>(0, 1), (0, 2), (1,2)</code></h3>
      <textarea className="CustomInput" type="text" onChange={this.textFieldChanged}
      value={this.state.input} required pattern="[([]{1}\s*([0-9]*)\s*,\s*[0-9]+\s*[)\]]{1}"
      placeholder="(0, 1), (0, 2), (1,2)"/>
      </div>);
	}

}

export default Custom;
