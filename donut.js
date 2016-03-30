/* Software Development p.3
*  By: Amanda Chiu, Wayez Chowdhury, Jeffrey Zou
*/

var index = document.getElementById('year').value;  //current user inputted year
var max = document.getElementById('year').max;  //max year user can input (1992)
var min = document.getElementById('year').min;  //min year user can input (2015)

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
	.insert("svg", "p")
	.append("g");

svg.append("g")
	.attr("class", "slices");

svg.append("g")
	.attr("class", "labels");

svg.append("g")
  .attr("class", "percents");

svg.append("g")
	.attr("class", "lines");

var width = window.innerWidth,
    height = 500,
	radius = Math.min(width, height) / 2;

svg.attr("transform", "translate(" + width / 2 + "," + (height / 2 - 50) + ")");

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

var key = function(d){ return d.data.label; };

var color = d3.scale.ordinal()
	.domain(["Republican","Independent","Democrat"])
	.range(["#c0392b", "#95a5a6", "#2980b9"])


  //Event component
var slider = document.getElementById('year');
  slider.addEventListener('change', function(e) {
  e.preventDefault();
  index = e.target.value;
  console.log(index);
});

//Retrieves appropriate set from data, returns map for change()
var getData = function getData() {
  var labels = color.domain();
  return labels.map(function(label) {
    return { label: label, value: data[index.toString()][label]}
  })
};

//for animation
function shuffle(first, second) {
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

  //for animation on load
  data0 = data;
  var was = shuffle(data, data0);
  var is = shuffle(data0, data);
  
	/* ------- SLICE ARCS -------*/

	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(was), key);

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


    /* ------- TEXT LABELS -------*/
    var text = svg.select('.labels').selectAll('text')
      .data(pie(is), key);
    //TODO: the problem lies here, .text on line 244 is called only once
    text.enter()
      .append('text')
      .attr('dy', '-5px')
      .text(function(d) {
        return d.data.label;
      });

    //Find the angle halfway between the end of the beginning
    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.transition().duration(1000)
  		.attrTween("transform", function(d) {
  			this._current = this._current || d;
  			var interpolate = d3.interpolate(this._current, d);
  			this._current = interpolate(0);
  			return function(t) {
  				var d2 = interpolate(t);
  				var pos = outerArc.centroid(d2);
          //If the half-way angle is less than pi -> radius * 1 else radius * -1
  				pos[0] = radius * (midAngle(d2) < Math.PI ? -1 : 1);
  				return "translate("+ pos +")";
  			};
  		})
  		.styleTween("text-anchor", function(d){
  			this._current = this._current || d;
  			var interpolate = d3.interpolate(this._current, d);
  			this._current = interpolate(0);
  			return function(t) {
  				var d2 = interpolate(t);
  				return midAngle(d2) < Math.PI ? "start":"end";
  			};
  		});

    text.exit()
      .remove();

    /* ------- PERCENTAGE LABELS -------*/
    var percents = svg.select('.percents').selectAll('text')
      .data(pie(is), key);

    console.log(is);

    percents.enter()
      .append('text')
      .attr('dy', '20px')
      .text(function(d) {
        return d.value+'%';
      });

      percents.transition().duration(1000)
    		.attrTween("transform", function(d) {
    			this._current = this._current || d;
    			var interpolate = d3.interpolate(this._current, d);
    			this._current = interpolate(0);
    			return function(t) {
    				var d2 = interpolate(t);
    				var pos = outerArc.centroid(d2);
            //If the half-way angle is less than pi -> radius * 1 else radius * -1
    				pos[0] = radius * (midAngle(d2) < Math.PI ? -1 : 1);
    				return "translate("+ pos +")";
    			};
    		})
    		.styleTween("text-anchor", function(d){
    			this._current = this._current || d;
    			var interpolate = d3.interpolate(this._current, d);
    			this._current = interpolate(0);
    			return function(t) {
    				var d2 = interpolate(t);
    				return midAngle(d2) < Math.PI ? "start":"end";
    			};
    		});

    	percents.exit()
    		.remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);

	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};
		});

  	polyline.exit()
  		.remove();
  };

change(getData());

//NEXT YEAR button
d3.select('.magic')
  .on('click', function() {
    change(getData());
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
