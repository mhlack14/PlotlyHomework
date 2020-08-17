console.log("test")


//get access to the data object 
function makegraphs(testSubject) {
d3.json("samples.json").then(function(data){
	console.log(data)
	
	//data.metadata.filter
	var samples = data.samples; 
	var resultArray = samples.filter(sampleObj => sampleObj.id == testSubject);
		console.log(resultArray)
		console.log("result array test")
	//getting top 10 OTUids
	var otu_ids = resultArray[0].otu_ids;
	var otu_labels= resultArray[0].otu_labels.slice(0,10).reverse();
		console.log(otu_ids)	
		
	//x and y values for the horizontal bar graph	
	var Y_values = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
	var sample_values = resultArray[0].sample_values.slice(0,10).reverse();
	
	//y values and text values for the bubble chart
	var bubble_sample_values = resultArray[0].sample_values;
	var otu_labels_bubble= resultArray[0].otu_labels;
	


	//Make the Various Graphs' code i.e. the trace, data, and layout
	//Bar graph trace and data
	var trace1 = {
		x:sample_values,
		y:Y_values,
		text:otu_labels,
		type:"bar",
		orientation:"h",
	};
	console.log(trace1)
	
		
	var data1=[trace1];
	console.log(data1)
		
	//Bar graph layout
	var layout1 = {
		title: "Top 10 OTU ids"
	}
	console.log(layout1)
	//create the bar graph with plotly
	Plotly.newPlot("bar",data1,layout1);
	
	
	//Bubble Chart
	//trace and data for bubble chart
	var trace2 = {
		x:otu_ids,
		y:bubble_sample_values,
		mode: "markers",
		marker:{
			size:bubble_sample_values,
			color:otu_ids
		},
		text:otu_labels_bubble
	};
		
	var data2 = [trace2];
		
	//Layout for bubble chart
	var layout2 = {
		title:"OTU ID"
		};
		
	//create bubble chart with plotly 
	Plotly.newPlot("bubble",data2,layout2);
	
});
}

	//MetaData Demographics information table code
	//read the json file again
function MakeMetaData(testSubject) {
	d3.json("samples.json").then(function(data){
	console.log(data)
	
	//metadata
		var metadata = data.metadata; 
		console.log(metadata)
	//create array of metadata on ids similar to how we did above
		var resultArray = metadata.filter(sampleObj => sampleObj.id == testSubject);
		console.log(resultArray)

		var metadataEntries = resultArray[0];
		console.log(metadataEntries)

	//select demographics panel per the div ID in the html
		var demographics=d3.select("#sample-metadata");
		demographics.html("");
	//get the demographic info and append to html table as key value pairs
		Object.entries(metadataEntries).forEach(([key,value]) => {
			demographics.append("h5").text(`${key}: ${value}`)})
})
}

//Dropdown Selection
function Run() {	
	d3.json("samples.json").then(function(data){
		console.log(data)
		
		//get the dropdown menu selected
		var dropdown = d3.select("#selDataset");
		console.log(dropdown)
		console.log("Below Dropdown")

		//get the test subject id number into the dropdown menu
			var names = data.names
			console.log(names)
			names.forEach(function(name){
				dropdown.append("option").text(name).property("value");
		});
	
		//Build the plots onto the webpage
			var sample = names[0];
			MakeMetaData(sample);
			makegraphs(sample);
});
}
//update the the graphs as a new test subject id is chosen
function optionChanged(selectName) {
	MakeMetaData(selectName);
	makegraphs(selectName);
}
console.log("end test")
Run();
	
	
