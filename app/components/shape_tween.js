import React, { Component } from 'react';
import d3 from 'd3';

export default class ShapeTween extends Component {
  componentDidMount () {

    var node = React.findDOMNode(this);

    var width = 960,
        height = 500;

    var projection = d3.geo.albers()
        .rotate([120, 0])
        .center([15, 35])
        .scale(1200);

    var svg = d3.select(node).append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("california.json", function(polygon) {
      console.log(polygon);
      var coordinates0 = polygon.coordinates[0].map(projection),
          coordinates1 = circle(coordinates0),
          path = svg.append("path"),
          d0 = "M" + coordinates0.join("L") + "Z",
          d1 = "M" + coordinates1.join("L") + "Z";

      loop();

      function loop() {
        path
            .attr("d", d0)
          .transition()
            .duration(5000)
            .attr("d", d1)
          .transition()
            .delay(5000)
            .attr("d", d0)
            .each("end", loop);
      }
    });

    function circle(coordinates) {
      var circle = [],
          length = 0,
          lengths = [length],
          polygon = d3.geom.polygon(coordinates),
          p0 = coordinates[0],
          p1,
          x,
          y,
          i = 0,
          n = coordinates.length;

      // Compute the distances of each coordinate.
      while (++i < n) {
        p1 = coordinates[i];
        x = p1[0] - p0[0];
        y = p1[1] - p0[1];
        lengths.push(length += Math.sqrt(x * x + y * y));
        p0 = p1;
      }

      var area = polygon.area(),
          radius = Math.sqrt(Math.abs(area) / Math.PI),
          centroid = polygon.centroid(-1 / (6 * area)),
          angleOffset = -Math.PI / 2, // TODO compute automatically
          angle,
          i = -1,
          k = 2 * Math.PI / lengths[lengths.length - 1];

      // Compute points along the circle’s circumference at equivalent distances.
      while (++i < n) {
        angle = angleOffset + lengths[i] * k;
        circle.push([
          centroid[0] + radius * Math.cos(angle),
          centroid[1] + radius * Math.sin(angle)
        ]);
      }

      return circle;
    }
  }

  render () {
    return React.DOM.div(null, '');
  }

}
