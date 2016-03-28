/* Software Development p.3
*
*
*
*/

var WIDTH = 860;
var HEIGHT = 600;
var radius = Math.min(WIDTH, HEIGHT) / 2;

//Initialize the svgs
var init = function() {
  var svg = d3.select('body')
    .append('svg')
    .append('g');

  svg.append('g')
  .attr('class', 'slice');
  svg.append('g')
  .attr('class', 'labels');
  svg.append('g')
  .attr('class', 'lines');
}

//Make a pie
