import React, { useEffect, useRef } from 'react';
import * as d3module from 'd3';
import d3tip from 'd3-tip';

const d3 = {
  ...d3module,
  tip: d3tip,
};
import { useD3 } from '../../api/useD3';

// PieChart Graph Dimensions
const dims = { height: 300, width: 300, radius: 150 };
const height = 500;
const width = 500;

// const data = [
//   {
//     name: 'double-arm',
//     value: 10,
//   },
//   {
//     name: 'single-arm',
//     value: 15,
//   },
//   {
//     name: 'push',
//     value: 30,
//   },
//   {
//     name: 'sagittal',
//     value: 5,
//   },
//   {
//     name: 'power',
//     value: 22,
//   },
// ];

// Important Note: addDims adjusts pieChart dims based on the respective page
const PieChart = ({ data, addDims }) => {
  const ref = useD3(
    (svg) => {
      // create margins and dimensions
      const cent = { x: width / 2 + 5, y: height / 2 + 5 };

      const arcTweenEnter = (d) => {
        // define interpolation
        // d3.interpolate returns a function we call i
        var i = d3.interpolate(d.endAngle, d.startAngle);
        //console.log(d);
        return function (t) {
          d.startAngle = i(t);
          return arcPath(d);
        };
      };

      const pie = d3
        .pie()
        .padAngle(0)
        .value((d) => d.value);

      const angle = pie([
        { name: 'rent', value: 500 },
        { name: 'bills', value: 300 },
        { name: 'gaming', value: 200 },
      ]);

      const arcPath = d3.arc().outerRadius(200).innerRadius(75);

      const colour = d3.scaleOrdinal(d3['schemeSet3']);

      colour.domain(data.map((d) => d.name));

      var tip = d3
        .tip()
        .offset([-20, 0])
        .attr('class', 'd3-tip')
        .html(function (e, d) {
          let content = `<div style='background:#18fccc;padding:4px;border-radius:4px;top:${
            e.pageY + 20
          };left:${e.pageX + 30};position:absolute;'>${d.data.name}<br>: ${
            d.data.value
          }</div>`;
          return content;
        });

      // OG values: cent.x, cent.y
      // had -50 for cent.x
      svg
        .select('.plot-area')
        .attr(
          'transform',
          ` translate(${addDims ? cent.x + 100 : cent.x}, ${cent.y})`
        )
        .selectAll()
        .data(pie(data))
        .join('path')
        .attr('class', 'arc')
        .attr('d', arcPath)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .attr('fill', (d) => colour(d.data.name))
        .on('mouseover', function (d, i) {
          tip.show(d, i, this);
        })
        .on('mousemove', function (d, i) {
          tip.show(d, i, this);
          d3.select(this)
            .transition('changeSliceFill')
            .duration(700)
            .attr('fill', '#D8F2FF');
        })
        .on('mouseout', function (d, i) {
          tip.hide(d, i, this);
          d3.select(this)
            .transition('changeSliceFill')
            .duration(700)
            .attr('fill', colour(i.data.name));
        })
        .transition()
        .duration(1500)
        .attrTween('d', arcTweenEnter);

      svg
        .select('.plot-area')
        .append('g')
        .attr('transform', `translate(${dims.width - 195 - 35}, -330)`)
        .selectAll('.dots')
        .data(data)
        .join('circle')
        .attr('cx', 100)
        .attr('cy', function (d, i) {
          return 100 + i * 30;
        })
        .attr('r', 10)
        .style('fill', function (d) {
          return colour(d.name);
        });

      // OG Values: 183, -325
      svg
        .select('.plot-area')
        .append('g')
        .attr('transform', `translate(${dims.width - 183 - 35}, -325)`)
        .attr('position', 'absolute')
        .selectAll('.labels')
        .data(data)
        .join('text')
        .attr('x', 100)
        .attr('y', function (d, i) {
          return 100 + i * 30;
        })
        .text(function (d, i) {
          return d.name;
        })
        .attr('fill', 'black')
        .attr('font-size', 20);

      svg.call(tip);
    },
    [data.length]
  );

  // OG Values: height: 80%, width: 90%

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${addDims ? height + 150 : height} ${width}`}
      style={{
        height: addDims ? '60%' : '80%',
        width: addDims ? '70%' : '90%',
        overflow: 'hidden',
      }}
      className="canvas"
    >
      <g className="plot-area" />
      <g className="body" />
    </svg>
  );
};

export default PieChart;
