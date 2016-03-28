/* Software Development p.3
*
*
*
*/

var WIDTH = 860;
var HEIGHT = 600;
var radius = Math.min(WIDTH, HEIGHT) / 2;
var data;
var colors;

//Initialize the svgs
var svg = d3.select('body')
  .append('svg')
  .append('g');

  svg.append('g')
  .attr('class', 'slice');
  svg.append('g')
  .attr('class', 'labels');
  svg.append('g')
  .attr('class', 'lines');

svg.attr('transform', 'translate(' + WIDTH/2 + ',' + HEIGHT/2 + ')');

var pie = d3.layout.pie()
  .value(function(d) {
    return d.value;
  });

var color = d3.scale.ordinal()
  .domain(data)
  .range(colors);

//Return the next set of data based on an index
var makeSubData = function() {
  //TODO
};

change(makeSubData);

//Add selector for the bar to scroll through the years

//Make a pie
function change(subData) {
  //Change the data represented on the donut graph based on a subset of the data
};
