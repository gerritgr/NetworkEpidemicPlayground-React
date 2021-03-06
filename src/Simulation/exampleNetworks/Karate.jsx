import Network from "./Network";

class KarateClass extends Network {
	constructor(){
    super("Karate",
[[1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [3, 2], [4, 0], [5, 0], [6, 0], [6, 4], [6, 5], [7, 0], [7, 1], [7, 2], [7, 3], [8, 0], [8, 2], [9, 2], [10, 0], [10, 4], [10, 5], [11, 0], [12, 0], [12, 3], [13, 0], [13, 1], [13, 2], [13, 3], [16, 5], [16, 6], [17, 0], [17, 1], [19, 0], [19, 1], [21, 0], [21, 1], [25, 23], [25, 24], [27, 2], [27, 23], [27, 24], [28, 2], [29, 23], [29, 26], [30, 1], [30, 8], [31, 0], [31, 24], [31, 25], [31, 28], [32, 2], [32, 8], [32, 14], [32, 15], [32, 18], [32, 20], [32, 22], [32, 23], [32, 29], [32, 30], [32, 31], [33, 8], [33, 9], [33, 13], [33, 14], [33, 15], [33, 18], [33, 19], [33, 20], [33, 22], [33, 23], [33, 26], [33, 27], [33, 28], [33, 29], [33, 30], [33, 31], [33, 32]]
      //[[2, 1],[3, 1], [3, 2],[4 ,1], [4, 2], [4, 3],[5, 1],[6, 1],[7, 1], [7, 5], [7, 6],[8, 1], [8, 2], [8, 3], [8, 4],[9, 1], [9, 3],[10, 3],[11, 1], [11, 5], [11, 6],[12, 1],[13, 1], [13, 4],[14, 1], [14, 2], [14, 3], [14, 4],[17, 6], [17, 7],[18, 1], [18, 2],[20, 1], [20, 2],[22, 1], [22, 2],[26, 24], [26, 25],[28, 3], [28, 24], [28, 25],[29, 3],[30, 24], [30, 27],[31, 2], [31, 9],[32, 1], [32, 25], [32, 26], [32, 29],[33, 3], [33, 9], [33, 15], [33, 16], [33, 19], [33, 21], [33, 23], [33, 24], [33, 30], [33, 31], [33, 32], [34, 9], [34, 10], [34, 14], [34, 15], [34, 16], [34, 19], [34, 20], [34, 21], [34, 23], [34, 24], [34, 27], [34, 28], [34, 29], [34, 30], [34, 31], [34, 32], [34, 33]]
    );
  }

	render(){
    return (<h3 id="karateExplanation">This is the so called "Zachary Karate Club Network". It models a university karate club.</h3>);
	}
}

export default KarateClass;
