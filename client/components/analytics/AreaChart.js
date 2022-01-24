import React, { useState, useEffect } from 'react';
import * as d3module from 'd3';
import d3tip from 'd3-tip';
const d3 = {
  ...d3module,
  tip: d3tip,
};

import { useD3 } from '../../api/useD3';
import { parse } from 'date-fns';

// data
// var data = [
//   { id: 'a', values: { x: 0, y: 10 } },
//   { id: 'a', values: { x: 1, y: 15 } },
//   { id: 'a', values: { x: 2, y: 40 } },
//   { id: 'a', values: { x: 3, y: 20 } },
//   { id: 'b', values: { x: 0, y: 2 } },
//   { id: 'b', values: { x: 1, y: 3 } },
//   { id: 'b', values: { x: 2, y: 5 } },
//   { id: 'b', values: { x: 3, y: 7 } },
// ];

// keys -->
//const keys = ['joe', 'sam', 'john', 'value'];

// DATA
// For the specific mode - Exercise, Total Load, Total Volume
// Want to create this when the respective button is pressed
// var data = [
//   { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//   { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//   { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//   { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
// ];

var parseDate = d3.timeParse('%Y-%m-%d');
//var parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

// MARGINS
// Original values 570, 520
var margin = { top: 20, right: 20, bottom: 40, left: 50 },
  width = 510 - margin.left - margin.right,
  height = 475 - margin.top - margin.bottom;

// original values
// const margin = { top: 60, right: 230, bottom: 50, left: 50 },
//   width = 660 - margin.left - margin.right,
//   height = 400 - margin.top - margin.bottom;

// TODO: - Remember to attach yearBegin and yearEnd dates as props
const AreaChart = ({
  data,
  button,
  exercise,
  yearBegin,
  yearEnd,
  keys,
  selectedName,
}) => {
  if (keys.length === 0) {
    // need to fix this, value shouldn't be showing up here at all // commenting it out, seemed to fix it
    //keys.push('value');
  }

  if (selectedName === undefined) {
    // Commeting this out seemed to fix the issue of value showing up and bugging things
    //selectedName = ['value'];
  }

  if (data === undefined) {
    //console.log('proc');
    data = [{ year: null, joe: 30, sam: 50, john: 70 }]; // date '2000-01-01'
  }

  console.log(button);
  console.log(data);
  console.log(exercise);
  console.log(selectedName);
  console.log(keys);
  //console.log(parseDate('2021-10-20T00:19:50.773Z')); // this works

  const ref = useD3(
    (svg) => {
      svg = d3
        .select('.plot-area2')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .join('g')
        .attr('transform', `translate(0, 4)`);

      // need to stack the data
      const color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet2);

      //stack the data?
      const stackedData = d3.stack().keys([selectedName])(data);

      // ORIGINAL
      // var x = d3
      //   .scaleLinear()
      //   .domain(
      //     d3.extent(data, function (d) {
      //       return d.year;
      //     })
      //   )
      //   .range([0, width]);

      // data.map((item) => {
      //   console.log(item.year);
      // });

      var x = d3
        .scaleTime()
        .domain([
          d3.min(data, function (d) {
            // yearBegin prop
            // might need to do some parsing to get it into the starting of that year - stop buggy behavior
            const date = new Date(d.year);
            return parseDate(
              `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            );
          }),
          d3.max(data, function (d) {
            // yearEnd prop
            // might need to do some parsing to get it into the ending of that year - stop buggy behavior
            const date = new Date(d.year);
            return parseDate(
              `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            );
            //return parseDate(d.year);
          }),
        ])
        .range([0, width]);

      const xAxis = svg
        .append('g')
        .style('color', 'steelblue')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5));

      // svg
      //   .append('text')
      //   .attr('text-anchor', 'end')
      //   .attr('x', width)
      //   .attr('y', height + 30)
      //   .attr('transform', `translate(-185, 0)`)
      //   .text('Time (year)');

      // Add Y axis label:
      svg
        .append('text')
        .attr('zIndex', 1000)
        .attr('text-anchor', 'end')
        .attr('x', 0)
        .attr('y', -20)
        .attr('transform', `translate(33, 100),rotate(-90)`)
        .text(button)
        .attr('text-anchor', 'start');

      // Add Y axis
      // TODO: - ********* need to fix domain range ************** -
      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return d[selectedName] * 1.35;
          }),
        ])
        .range([height, 0]);

      svg
        .append('g')
        .style('color', 'steelblue')
        .call(d3.axisLeft(y).ticks(5).tickSize(0));

      const clip = svg
        .append('defs')
        .append('svg:clipPath')
        .attr('id', 'clip')
        .append('svg:rect')
        .attr('width', width)
        .attr('height', height)
        .attr('x', 0)
        .attr('y', 0);

      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [width, height],
        ])
        .on('end', updateChart);

      const areaChart = svg.append('g').attr('clip-path', 'url(#clip)');

      // Area Generator
      const area = d3
        .area()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
          const date = new Date(d.data.year);

          return x(
            parseDate(
              `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            )
          );
        })
        .y0(function (d) {
          return y(d[0]);
        })
        .y1(function (d) {
          return y(d[1]);
        });

      // Show the areas
      areaChart
        .selectAll('mylayers')
        .data(stackedData)
        .join('path')
        .attr('class', function (d) {
          return 'myArea ' + d.key;
        })
        .attr('transform', `translate(0, 0)`)
        .style('fill', function (d) {
          return color(d.key);
        })
        .attr('d', area);

      // Add the brushing
      areaChart.append('g').attr('class', 'brush').call(brush);

      let idleTimeout;
      function idled() {
        idleTimeout = null;
      }

      // A function that update the chart for given boundaries
      function updateChart(event, d) {
        var extent = event.selection;

        //[d3.min(data, function(d){ return d.year; }), d3.max(data, function(d){ return d.year; })]

        // x.domain(
        //   d3.extent(data, function (d) {
        //     return d.year;
        //   })
        // );

        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if (!extent) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
          x.domain([
            d3.min(data, function (d) {
              const date = new Date(d.year);
              return parseDate(
                `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
              );
              //return parseDate(d.year);
            }),
            d3.max(data, function (d) {
              const date = new Date(d.year);
              return parseDate(
                `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
              );
              //return parseDate(d.year);
            }),
          ]);
        } else {
          x.domain([x.invert(extent[0]), x.invert(extent[1])]);
          areaChart.select('.brush').call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
        }

        // Update axis and area position
        xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5));

        areaChart.selectAll('path').transition().duration(1000).attr('d', area);
      }

      //////////
      // HIGHLIGHT GROUP //
      //////////

      // What to do when one group is hovered
      const highlight = function (event, d) {
        // reduce opacity of all groups
        d3.selectAll('.myArea').style('opacity', 0.1);
        // expect the one that is hovered
        d3.select('.' + d).style('opacity', 1);
      };

      // And when it is not hovered anymore
      const noHighlight = function (event, d) {
        d3.selectAll('.myArea').style('opacity', 1);
      };

      const size = 20;
      svg
        .selectAll('myrect')
        .data([selectedName])
        .join('rect')
        .attr('x', 400)
        .attr('y', function (d, i) {
          return 10 + i * (size + 5);
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr('width', size)
        .attr('height', size)
        .attr('transform', `translate(-25, 0)`)
        .style('fill', function (d) {
          return color(d);
        })
        .on('mouseover', highlight)
        .on('mouseleave', noHighlight);

      // Add one dot in the legend for each name.
      svg
        .selectAll('mylabels')
        .data([selectedName])
        .join('text')
        .attr('transform', `translate(-25, 0)`)
        .attr('x', 400 + size * 1.2)
        .attr('y', function (d, i) {
          return 10 + i * (size + 5) + size / 2;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style('fill', function (d) {
          return color(d);
        })
        .text(function (d) {
          return d;
        })
        .attr('text-anchor', 'left')
        .style('alignment-baseline', 'middle')
        .on('mouseover', highlight)
        .on('mouseleave', noHighlight);

      // const data2 = d3
      //   .csv(
      //     'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv'
      //   )
      //   .then(function (data) {
      //     const key = data.columns.slice(1);

      //     //console.log(key);
      //     //console.log(data);
      //   });

      // var area = d3
      //   .area()
      //   .curve(d3.curveMonotoneX)
      //   .x(function (d) {
      //     console.log(d);
      //     return x(d);
      //   })
      //   .y0(height)
      //   .y1(function (d) {
      //     return y1(d);
      //   });
    },
    [data.length, button, exercise, selectedName]
  );

  // svg
  //       .select('.plot-area')
  //       .attr('transform', 'translate(0,20)')
  //       .attr('width', width + margin.left + margin.right)
  //       .attr('height', height + margin.top + margin.bottom)
  //       .join('g')
  //       .append('path')
  //       .datum(data)
  //       .attr('class', function (d) {
  //         return `area ${d.id}`;
  //       })
  //       .attr('d', area)
  //       .style('fill', function (d) {
  //         return color(d.id);
  //       });

  // svg
  //       .select('.plot-area')
  //       .attr('transform', 'translate(0,20)')
  //       .attr('width', width + margin.left + margin.right)
  //       .attr('height', height + margin.top + margin.bottom)
  //       .selectAll('g')
  //       .data(data)
  //       .join('path')
  //       .attr('class', function (d) {
  //         return `area ${d.id}`;
  //       })
  //       .attr('d', function (d) {
  //         area(d.values);
  //       })
  //       .style('fill', function (d, i) {
  //         console.log(i);
  //         return color(d.id);
  //       });

  // svg
  //       .select('.plot-area')
  //       .attr('transform', 'translate(0,20)')
  //       .attr('width', width + margin.left + margin.right)
  //       .attr('height', height + margin.top + margin.bottom)
  //       .selectAll('.area')
  //       .data(data)
  //       .join('path')
  //       .attr('class', function (d) {
  //         return `area ${d.id}`;
  //       })
  //       .attr('d', function (d) {
  //         console.log(d);
  //         console.log(area(d.values));
  //         return area([d.values]);
  //       })
  //       .style('fill', function (d) {
  //         return color(d.id);
  //       });

  // OG Values: height: 70%, width: 100%
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${height} ${width}`}
      style={{
        height: '50%',
        width: '100%',
      }}
    >
      <g className="plot-area2" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default AreaChart;
