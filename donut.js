/* Software Development p.3
*  By: Amanda Chiu, Wayez Chowdhury, Jeffrey Zou
*
*
*/

var index = document.getElementById('year').value;
var max = document.getElementById('year').max;
var min = document.getElementById('year').min;

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
  },
  "1999": {
    "Republican":"27",
    "Democrat":"33",
    "Independent":"34"
  },
  "2000": {
    "Republican":"28",
    "Democrat":"33",
    "Independent":"29"
  },
  "2001": {
    "Republican":"29",
    "Democrat":"34",
    "Independent":"29"
  },
  "2002": {
    "Republican":"30",
    "Democrat":"31",
    "Independent":"30"
  },
  "2003": {
    "Republican":"30",
    "Democrat":"31",
    "Independent":"31"
  },
  "2004": {
    "Republican":"29",
    "Democrat":"33",
    "Independent":"30"
  },
  "2005": {
    "Republican":"29",
    "Democrat":"33",
    "Independent":"31"
  },
  "2006": {
    "Republican":"28",
    "Democrat":"33",
    "Independent":"30"
  },
  "2007": {
    "Republican":"25",
    "Democrat":"33",
    "Independent":"34"
  },
  "2008": {
    "Republican":"25",
    "Democrat":"35",
    "Independent":"31"
  },
  "2009": {
    "Republican":"24",
    "Democrat":"34",
    "Independent":"35"
  },
  "2010": {
    "Republican":"25",
    "Democrat":"33",
    "Independent":"36"
  },
  "2011": {
    "Republican":"24",
    "Democrat":"32",
    "Independent":"37"
  },
  "2012": {
    "Republican":"25",
    "Democrat":"32",
    "Independent":"37"
  },
  "2013": {
    "Republican":"24",
    "Democrat":"32",
    "Independent":"38"
  },
  "2014": {
    "Republican":"23",
    "Democrat":"32",
    "Independent":"39"
  },
  "2015": {
    "Republican":"23.7",
    "Democrat":"30.4",
    "Independent":"40.1"
  }
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
    //Change the data Republicanresented on the donut graph based on a subset of the data

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
  "Republican":"28",
  "Democrat":"33",
  "Independent":"36"
}*/

function mergeWithFirstEqualZero(first, second){
  var secondSet = d3.set();
  second.forEach(function(d) { secondSet.add(d.label); });
  var onlyFirst = first
    .filter(function(d){ return !secondSet.has(d.label) })
    .map(function(d) { return {label: d.label, value: 0}; });
  return d3.merge([ second, onlyFirst ])
    .sort(function(a,b) {
      return d3.ascending(a.label, b.label);
    });
}
var getData = function getData() {

  var labels = color.domain();
  return labels.map(function(label) {
    return { label: label, value: data[index.toString()][label]}
  })
  return data[index.toString()];
};

d3.select('.magic')
  .on('click', function() {
    change(getData());
  });

function change(data) {
	//var duration = document.getElementById('year').value;
	//var data0 = svg.select(".slices").selectAll("path.slice")
		//.data().map( getData, function(d) { return d.data });
  //console.log(data);
  //console.log(data0);
	//if (data0.length == 0) data0 = data;
  data0 = data;
	var was = mergeWithFirstEqualZero(data, data0);
	var is = mergeWithFirstEqualZero(data0, data);
  //console.log(was);
  //console.log(is);
  //Change the data Republicanresented on the donut graph based on a subset of the data

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
		.transition().duration(index)
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
		.exit().transition().delay(index).duration(0)
		.remove();
  };

change(getData());

//Event component

var slider = document.getElementById('year');
slider.addEventListener('change', function(e) {
  e.preventDefault();
  index = e.target.value;
  console.log(index);
});

/* Automatic stuff */
//Call the change function, change the interval, and move the slider
var beginMove = function() {
  change(getData());
  if (index == max) {
    index = min;
    document.getElementById('year').stepDown(max-min);
  }
  else {
    index++;
    document.getElementById('year').stepUp();
  }
};

var interval;
var start = document.getElementsByClassName('move')[0];
start.addEventListener('click', function(e) {
  interval = setInterval(beginMove, 3000);
});

var stop = document.getElementsByClassName('stop')[0];
stop.addEventListener('click', function(e) {
  clearInterval(interval);
});
