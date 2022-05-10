import React, { useEffect, useRef } from 'react';
import * as d3module from 'd3';
import d3tip from 'd3-tip';
const d3 = {
  ...d3module,
  tip: d3tip,
};
import { useD3 } from '../../api/useD3';

// data: seems to be the only variable, everything else seems to be constant
// const data = [
//   {
//     name: 'ankle',
//     flexion: 2,
//     extension: 3,
//     abduction: 5,
//     adduction: 1,
//     'internal rotation': 2,
//     'external rotation': 3,
//   },
//   {
//     name: 'knee',
//     flexion: 1,
//     extension: 5,
//     abduction: 8,
//     'internal rotation': 5,
//     'external rotation': 1,
//   },
//   {
//     name: 'shoulder',
//     flexion: 1,
//     extension: 5,
//     abduction: 8,
//     'internal rotation': 5,
//     'external rotation': 1,
//   },
//   {
//     name: 'wrist',
//     flexion: 1,
//     extension: 5,
//     abduction: 8,
//     'internal rotation': 5,
//     'external rotation': 1,
//   },
// ];

// const keys = [
//   'flexion',
//   'extension',
//   'abduction',
//   'adduction',
//   'internal rotation',
//   'external rotation',
// ];

// ForceChart Graph Dimensions
const height = 550;
const width = 500;

const StackedBarChart = ({ data, keys, addDims }) => {
  console.log(data);
  const ref = useD3(
    (svg) => {
      // create margins and dimensions
      const margin = { top: 20, right: 30, bottom: 30, left: 30 };
      const t = d3.transition().duration(1500);

      const widthTween = (d) => {
        // define interpolation
        // d3.interpolate returns a function we call i
        let i = d3.interpolate(0, x.bandwidth());

        // return a function which takes in a time ticker 't'
        return function (t) {
          // return the value from passing the ticker into the interpolater

          return i(t);
        };
      };

      const stackGenerator = d3.stack().keys(keys);
      const layers = stackGenerator(data);
      console.log(data);
      console.log(keys);

      // colour scheme
      const colour = d3.scaleOrdinal(d3['schemeSet3']);
      colour.domain(layers.map((d) => d.key));

      const extent = [
        0,
        d3.max(layers, (layer) => d3.max(layer, (sequence) => sequence[1])),
      ];

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .rangeRound([margin.left, width - margin.right])
        .paddingInner(0.4)
        .paddingOuter(0.4);

      const y1 = d3
        .scaleLinear()
        .domain(extent)
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g
          .attr(
            'transform',
            `translate(${addDims ? '22' : '0'}, ${height - margin.bottom})`
          )
          .style('color', 'steelblue')
          .call(d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0));

      const y1Axis = (g) =>
        g
          .attr(
            'transform',
            `translate(${addDims ? margin.left + 22 : margin.left},0)`
          )
          .style('color', 'steelblue')
          .call(d3.axisLeft(y1))
          .call((g) => g.select('.domain').remove());

      svg.select('.x-axis').call(xAxis);
      svg.select('.y-axis').call(y1Axis);

      var tooltip = d3.select('.tooltip-area').style('opacity', 0);
      console.log(layers);

      var tip = d3
        .tip()
        .attr('class', 'd3-tip')
        .html(function (e, d) {
          let content = `<div style='background:#18fccc;padding:4px;border-radius:4px;position:absolute;'>${d.key}</div>`;
          return content;
        });

      svg
        .select('.plot-area')
        .attr('fill', 'steelblue')
        .attr('transform', `translate(${addDims ? '22' : '0'}, 0)`)
        .selectAll('.layer')
        .data(layers)
        .join('g')
        .attr('class', 'layer')
        .attr('fill', (layer) => colour(layer.key))
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
            .attr('fill', (layer) => colour(layer.key));
        })
        .selectAll('rect')
        .data((layer) => layer)
        .join('rect')
        .attr('x', (d) => x(d.data.name))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y1(d[1]))
        .attr('height', (d) => y1(d[0]) - y1(d[1]))
        .merge(svg)
        .transition(t)
        .attrTween('width', widthTween);

      //-175
      svg
        .select('.plot-area')
        .append('g')
        .attr(
          'transform',
          `translate(${addDims ? '360' : '338'}, ${addDims ? '-70' : '-175'})`
        )
        .selectAll('.dots')
        .data(layers)
        .join('circle')
        .attr('cx', 100)
        .attr('cy', function (d, i) {
          return 100 + i * 30;
        })
        .attr('r', 7)
        .style('fill', function (d) {
          return colour(d.key);
        });

      // OG values for translate 348, -171
      svg
        .select('.plot-area')
        .append('g')
        .attr(
          'transform',
          `translate(${addDims ? '370' : '348'},${addDims ? '-67' : '-171'})`
        )
        .attr('position', 'absolute')
        .selectAll('.labels')
        .data(layers)
        .join('text')
        .attr('x', 100)
        .attr('y', function (d, i) {
          return 100 + i * 30;
        })
        .text(function (d, i) {
          return d.key;
        })
        .attr('fill', 'black')
        .attr('font-size', 13);

      svg
        .select('.x-axis')
        .selectAll('text')
        .attr('transform', 'rotate(-45) translate(-2,-5)')
        .attr('text-anchor', 'end')
        .attr('color', 'black')
        .attr('font-size', 16);

      svg.call(tip);
    },
    [data.length]
  );

  // 50, 90 values
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${addDims ? height + 70 : height} ${
        addDims ? width + 90 : width
      }`}
      style={{
        height: '72%',
        width: '74%',
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default StackedBarChart;
