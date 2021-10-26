//let states = ["S", "I", "R"];

//let rules = [[ "I", "R", 1 ], // spontaneous rule  I -> R with rate 1.0
				//[ "R", "S", 0.7 ],  // spontaneous rule R -> S with rate 0.7
				//[ [ "I","S","I" ],[ "I","I","I" ], 0.8 ]]; // contact rule I+S -> I+I with rate 0.8


//output
let simulation = []


//let graph_as_edgelist = [[ 0, 4 ], [ 0, 1 ], [ 1, 5 ], [ 1, 2 ], [ 2, 6 ], [ 2, 3 ], [ 3, 7 ], [ 4, 8 ], [ 4, 5 ], [ 5, 9 ], [ 5, 6 ], [ 6, 10 ], [ 6, 7 ], [ 7, 11 ], [ 8, 12 ], [ 8, 9 ], [ 9, 13 ], [ 9, 10 ], [ 10, 14 ], [ 10, 11 ], [ 11, 15 ], [ 12, 13 ], [ 13, 14 ], [ 14, 15 ]];

//let horizon = 20.0;   // wie lange wird simuliert
//let initial_distribution = [0.5, 0.5, 0.0]; // gleiche Reihenfolge wie states, musss zu rules passen und normalisiert werden
let timepoint_num = 101;

function get_next_state(current_labels){
  let fastes_firing_time = 10000000.0;  //dummy
	let firing_rule = null;
	let firing_node = null;
	let firing_edge = null;

	//if(current_labels == null)
	//iterate over nodes
	for(var currentNode in nodes){
		currentNode = nodes[currentNode];
		let current_state = current_labels[currentNode];
		for(var rule in rules){
			rule = rules[rule];
			if(rule[0] instanceof Array){
				//is contact rule
				continue;
			}
			if(current_state === rule[0]){
				let current_fireing_time = randomExponential(rule[2]);
				//addFiringTime(current_fireing_time);
				if(current_fireing_time < fastes_firing_time){
					fastes_firing_time = current_fireing_time;
					firing_rule = rule;
					firing_node = currentNode;
					firing_edge = null;
				}
			}
		}
	}
	//iterate over edges
	for(var edge in graph_as_edgelist){
		edge = graph_as_edgelist[edge];
		let node1 = edge;
		let node2 = edge;
		let current_state1 = current_labels[node1];
		let current_state2 = current_labels[node2];
		for(var currentRule in rules){
			currentRule = rules[currentRule];
			if(typeof currentRule[0] == typeof ""){
				//is spont. rule
				continue
			}
			if((current_state1 === currentRule[0][0] && current_state2 === currentRule[0][1]) || (current_state2 === currentRule[0][0] && current_state1 === currentRule[0][1])){
				let current_fireing_time = randomExponential(currentRule[2]);
				if(current_fireing_time < fastes_firing_time){
					fastes_firing_time = current_fireing_time;
					firing_rule = currentRule;
					firing_node = null;
					firing_edge = edge;
				}
			}
		}
	}

	if(firing_rule == null){
		//no rule could fire
		return [null, fastes_firing_time]; //would happen anyway but still
	}
	//apply rule
	let new_labels = Array.from(current_labels);

	if(firing_node != null){
		new_labels[firing_node] = firing_rule[1];
		return [new_labels, fastes_firing_time];
	}
	console.assert(firing_edge != null);
	let change_node1 = firing_edge[0];
	let change_node2 = firing_edge[1];
	//we have to check which node changes in which direction
	if(new_labels[change_node1] === firing_rule[0][0] && new_labels[change_node2] === firing_rule[0][1]){
		new_labels[change_node1] = firing_rule[1][0];
		new_labels[change_node2] = firing_rule[1][1];
	}else{
		new_labels[change_node1] = firing_rule[1][1];
		new_labels[change_node2] = firing_rule[1][0];
	}

	return [new_labels, fastes_firing_time];
}


function count_states(current_labels){
	var counter = [];

  for (var _ in states) {
    counter.push(0);
  }


	simulation.push(current_labels);

	for(var label in current_labels){
    label = current_labels[label];
    let index = states.indexOf(label);
		counter[index] += 1;
	}

  let newX = state_counts[0]["values"].length;
  //add to the global counter value
  for (var i = 0; i < states.length; i++) {
    state_counts[i]["values"].push( [newX, counter[i]] );
  }
}

function generateNodes(edgelist){
	let allNodes = [];
	for(var e in edgelist){
		e = edgelist[e];
		allNodes.push(e[0]);
		allNodes.push(e[1]);
	}
	//sort
  allNodes = allNodes.sort(function(a, b) {
    return a - b;
  });

	//remove duplicates
	let finalArray = [];
	var last = -1;
	for(var i = 0; i < allNodes.length; i ++){
		if(last === allNodes[i]){
			continue;
		}
		else{
			finalArray.push(allNodes[i])
			last = allNodes[i];
		}
	}
	return finalArray;
}



// np helper functions
function randomExponential(rate){
	if(rate === 0){ return 10000000 }
	return -Math.log(Math.random()) / rate;
}

function linspace(start, end, num){
	console.assert(start < end);
	console.assert(num > 0);
	let distance = (end - start) / (num - 1);
	let current = start;
	let out = [];
	while(current <= end){
		out.push(Math.round(current * 100) / 100);
		current += distance;
	}
	return out;
}

function randomChoice(states, num, distr){
	let out = [];
	let s = distr.reduce((a,e) => a + e);
	for(var i = 0; i < num; i++){
		let r = Math.random() * s;
		out.push(states.find((_,i) => (r -= distr[i]) < 0));
	}
	return out;
}


//This is to be set by parent
let rules;
let states;
let initial_distribution;
let graph_as_edgelist;
let horizon;

let nodes;

//setup
let timepoints_samples;
let current_labels;
let global_clock;
let labels = [];
let state_counts = {};

function simulate(newRules, newStates, newDistr, newGraph, newHorizon){
	simulation = [];
	rules = newRules;
	states = newStates;
	initial_distribution = newDistr;
	graph_as_edgelist = newGraph;
	horizon = newHorizon;
	//setup 
	nodes = generateNodes(graph_as_edgelist);
	timepoints_samples = linspace(0, horizon, timepoint_num);
	current_labels = randomChoice(states, nodes.length, initial_distribution);
	global_clock = 0;
	labels = [];
	state_counts = [];

  
  //initiate count_states
  for (var state in states) {
    state = states[state];
    state_counts.push({key: state, values: []});
  }

	while(timepoints_samples.length > 0){
		let [new_labels, time_passed] = get_next_state(current_labels);
		global_clock += time_passed;
		while(timepoints_samples.length > 0 && global_clock > timepoints_samples[0]){
			labels.push(Array.from(current_labels));
			count_states(current_labels);
			timepoints_samples = timepoints_samples.slice(1, timepoints_samples.length);
		}
		current_labels = new_labels;
	}
	return {data: simulation, stateCounts: state_counts};
}

export default simulate;
