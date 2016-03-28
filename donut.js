/* Software Development p.3
*
*
*
*/


//Initialize the svgs
var svg = d3.select("body")
	.append("svg")
	.append("g")

svg.append("g")
	.attr("class", "slices");
  /*
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");
*/

var width = 860,
    height = 600,
	radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function(d){ return d.data.label; };

var color = d3.scale.ordinal()
	.domain(["Republican","Democrat","Independent"])
	.range(["#c0392b", "#2980b9", "#95a5a6"])

/*
  //Add selector for the bar to scroll through the years
  function randomData (){
  	var labels = color.domain();
  	return labels.map(function(label){
  		return { label: label, value: Math.random() }
  	}).filter(function() {
  		return Math.random() > .5;
  	}).sort(function(a,b) {
  		return d3.ascending(a.label, b.label);
  	});

  //first time
  change(randomData());

  d3.select(".randomize")
  	.on("click", function(){
  		change(randomData());
  	});
  //Make a pie
  function mergeWithFirstEqualZero(first, second){
  	var secondSet = d3.set(); second.forEach(function(d) { secondSet.add(d.label); });

  	var onlyFirst = first
  		.filter(function(d){ return !secondSet.has(d.label) })
  		.map(function(d) { return {label: d.label, value: 0}; });
  	return d3.merge([ second, onlyFirst ])
  		.sort(function(a,b) {
  			return d3.ascending(a.label, b.label);
  		});
  }
  function change(data) {
  	var duration = +document.getElementById("duration").value;
  	var data0 = svg.select(".slices").selectAll("path.slice")
  		.data().map( getData(), function(d) { return d.data });
  	if (data0.length == 0) data0 = data;
  	var was = mergeWithFirstEqualZero(data, data0);
  	var is = mergeWithFirstEqualZero(data0, data);
    //Change the data represented on the donut graph based on a subset of the data

  	 ------- SLICE ARCS -------

  	var slice = svg.select(".slices").selectAll("path.slice")
  		.data(pie(was), key);

  	slice.enter()
  		.insert("path")
  		.attr("class", "slice")
  		.style("fill", function(d) { return color(d.data.label); })
  		.each(function(d) {
  			this._current = d;
  		});

  	slice = svg.select(".slices").selectAll("path.slice")
  		.data(pie(is), key);

  	slice
  		.transition().duration(duration)
  		.attrTween("d", function(d) {
  			var interpolate = d3.interpolate(this._current, d);
  			var _this = this;
  			return function(t) {
  				_this._current = interpolate(t);
  				return arc(_this._current);
  			};
  		});

  	slice = svg.select(".slices").selectAll("path.slice")
  		.data(pie(data), key);

  	slice
  		.exit().transition().delay(duration).duration(0)
  		.remove();
    };
  */

/*Outputs object "1992": {
  "rep":"28",
  "dem":"33",
  "indep":"36"
}*/

function getData() {
  $.getJSON('data.json', function() {

  })
};


change(getData());

function change(data) {
	var duration = +document.getElementById("duration").value;
	var data0 = svg.select(".slices").selectAll("path.slice")
		.data().map( getData(), function(d) { return d.data });
	if (data0.length == 0) data0 = data;
	var was = mergeWithFirstEqualZero(data, data0);
	var is = mergeWithFirstEqualZero(data0, data);
  //Change the data represented on the donut graph based on a subset of the data

	/* ------- SLICE ARCS -------*/

	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(was), key); //refer to big comment to see what "was" is

	slice.enter()
		.insert("path")
		.attr("class", "slice")
		.style("fill", function(d) { return color(d.data.label); })
		.each(function(d) {
			this._current = d; //whats _current?
		});

	slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(is), key); //refer to big comment to see what "is" is

	slice
		.transition().duration(duration)
		.attrTween("d", function(d) {
			var interpolate = d3.interpolate(this._current, d);
			var _this = this;
			return function(t) {
				_this._current = interpolate(t);
				return arc(_this._current);
			};
		});

	slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	slice
		.exit().transition().delay(duration).duration(0)
		.remove();
  };
