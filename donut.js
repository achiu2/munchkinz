/* Software Development p.3
*  By: Amanda Chiu, Wayez Chowdhury, Jeffrey Zou
*
*
*/

var index = 1992;

var data = {
  "1992": {
    "Republican": "28",
    "Democrat": "33",
    "Independent":"36"
  },
  "1993": {
    "Republican":"27",
    "Democrat":"34",
    "Independent":"34"
  },
  "1994": {
    "Republican":"30",
    "Democrat":"32",
    "Independent":"34"
  },
  "1995": {
    "Republican":"31",
    "Democrat":"30",
    "Independent":"33"
  },
  "1996": {
    "Republican":"29",
    "Democrat":"33",
    "Independent":"33"
  },
  "1997": {
    "Republican":"28",
    "Democrat":"33",
    "Independent":"32"
  },
  "1998": {
    "Republican":"28",
    "Democrat":"34",
    "Independent":"31"
  }
  /*
  ,
  "1999": {
    "rep":"27",
    "dem":"33",
    "indep":"34"
  },
  "2000": {
    "rep":"28",
    "dem":"33",
    "indep":"29"
  },
  "2001": {
    "rep":"29",
    "dem":"34",
    "indep":"29"
  },
  "2002": {
    "rep":"30",
    "dem":"31",
    "indep":"30"
  },
  "2003": {
    "rep":"30",
    "dem":"31",
    "indep":"31"
  },
  "2004": {
    "rep":"",
    "dem":"",
    "indep":""
  },
  "2005": {
    "rep":"29",
    "dem":"33",
    "indep":"30"
  },
  "2006": {
    "rep":"28",
    "dem":"33",
    "indep":"30"
  },
  "2007": {
    "rep":"25",
    "dem":"33",
    "indep":"34"
  },
  "2008": {
    "rep":"25",
    "dem":"35",
    "indep":"31"
  },
  "2009": {
    "rep":"24",
    "dem":"34",
    "indep":"35"
  },
  "2010": {
    "rep":"25",
    "dem":"33",
    "indep":"36"
  },
  "2011": {
    "rep":"24",
    "dem":"32",
    "indep":"37"
  },
  "2012": {
    "rep":"25",
    "dem":"32",
    "indep":"37"
  },
  "2013": {
    "rep":"24",
    "dem":"32",
    "indep":"38"
  },
  "2014": {
    "rep":"23",
    "dem":"32",
    "indep":"39"
  },
  "2015": {
    "rep":"23.7",
    "dem":"30.4",
    "indep":"40.1"
  }*/
};

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


/* TODO: i = (index) year from draggy bar element in HTML */
var getData = function getData(i) {
  var labels = color.domain();
  return labels.map(function(label) {
    return { label: label, value: data[i.toString()][label]}
  })
  return data[index.toString()];
};

change(getData(document.getElementById("year").value));

function change(data) {
	var duration = document.getElementById('year').value;
	var data0 = svg.select(".slices").selectAll("path.slice")
		.data().map( getData, function(d) { return d.data });
	if (data0.length == 0) data0 = data;
	var was = mergeWithFirstEqualZero(data, data0);
	var is = mergeWithFirstEqualZero(data0, data);
  console.log(was);
  console.log(is);
  //Change the data represented on the donut graph based on a subset of the data

	/* ------- SLICE ARCS -------*/

	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(was), key); //refer to couple lines above to see what "was" is

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
