import Network from "./Network";

class KarateClass extends Network {
	constructor(){
    //super("Karate",
    //[[2,1], [3,1], [4,1], [5,1]]);
    super("Karate",
    [[0,1], [1,2], [3,4], [4,5], [6,7], [7,8], [0,3], [3,6], [1,4], [4,7], [2,5], [5,8]]);
	}

	render(){
    return (<h1>placeholder</h1>);
	}
}

export default KarateClass;
