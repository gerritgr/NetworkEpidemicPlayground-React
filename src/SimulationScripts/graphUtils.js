function edgelistToDot(name, inp){
	var output = "strict graph \"" + name + "\" {\n";
	for(var e in inp){
		e = inp[e];
		output += e[0] + " -- " + e[1] + ";\n";
	}
	output += "}";
	return output;
}

function dotToEdgelist(graph){
	var outList = [];
	graph = graph.split("\n");
	//var name = graph[0].split(" ")[2];
	//name = name.slice(1, name.length - 1);
	for (var i = 0; i < graph.length - 1; i++){
		if(i === 0){
			continue;
		}
		var nodes = graph[i].split("--");
		var node1 = Number(nodes[0]);
		var node2 = Number(nodes[1].slice(0, nodes[1].length - 1));
		outList.push([node1, node2]);
	}
	return outList;
}

function edgeListToGraph(list){
	let outNodes = [];
	let outLinks = [];
	for (var entry in list){
		entry = list[entry];
		outNodes.push(entry[0]);
		outNodes.push(entry[1]);
		outLinks.push({data: {source: entry[0], target:entry[1]}});
	}
	//sort
	outNodes = outNodes.sort((a, b) => (a > b));
	//remove duplicates
	let finalArray = [];
	var last = -1;
	for(var i = 0; i < outNodes.length; i ++){
		if(last === outNodes[i]){
			continue;
		}
		else{
			finalArray.push({data: {id: outNodes[i], label: ""}})
			last = outNodes[i];
		}
	}
	outNodes = finalArray;
	return [...outNodes, ...outLinks]
}

export default edgeListToGraph;
