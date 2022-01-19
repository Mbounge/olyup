import React, { useEffect, useRef } from 'react';
import * as d3module from 'd3';
import d3tip from 'd3-tip';
const d3 = {
  ...d3module,
  tip: d3tip,
};
import { useD3 } from '../../api/useD3';

const getLocalStorage = (key, initialValue) => {
  try {
    const value = localStorage.getItem(key);
    console.log(`VALUE ${value}`);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    return initialValue;
  }
};

// Force Chart data
const trainingSession = getLocalStorage('TrainingSession', 'value');

// 470, 500
// 530
// 500
// ForceChart Graph Dimensions
const height = 530;
const width = 500;

const HBarChart = ({ data, addDims }) => {
  const ref = useD3(
    (svg) => {
      // create margins and dimensions
      const margin = { top: 20, right: 30, bottom: 30, left: 30 };
      const t = d3.transition().duration(1500);

      const widthTween = (d) => {
        // define interpolation
        // d3.interpolate returns a function we call i
        let i = d3.interpolate(0, y1.bandwidth());

        // return a function which takes in a time ticker 't'
        return function (t) {
          // return the value from passing the ticker into the interpolater

          return i(t);
        };
      };

      const x = d3
        .scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, (d) => d.value)]);

      const y1 = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .rangeRound([height - margin.right, margin.left])
        .paddingInner(0.4)
        .paddingOuter(0.4);

      const xAxis = (g) =>
        g
          .attr(
            'transform',
            `translate(${addDims ? '100' : '0'}, ${height - margin.bottom})`
          )
          .style('color', 'steelblue')
          .call(d3.axisBottom(x));

      const y1Axis = (g) =>
        g
          .attr(
            'transform',
            `translate(${addDims ? margin.left + 100 : margin.left},0)`
          )
          .style('color', 'steelblue')
          .call(d3.axisLeft(y1).tickSize(0))
          .call((g) => g.select('.domain').remove());

      svg.select('.x-axis').call(xAxis);
      svg.select('.y-axis').call(y1Axis);

      var tooltip = d3.select('.tooltip-area').style('opacity', 0);

      var tip = d3
        .tip()
        .offset([-20, 0])
        .attr('class', 'd3-tip')
        .html(function (e, d) {
          let content = `<div style='background:#18fccc;padding:4px;border-radius:4px;top:${
            e.pageY + 20
          };left:${e.pageX + 30};position:absolute;'>${d.name}<br>: ${
            d.value
          }</div>`;
          return content;
        });

      const bars = svg
        .select('.plot-area')
        .attr('transform', `translate(${addDims ? '100' : '0'},0)`)
        .attr('fill', 'steelblue')
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('y', (d) => y1(d.name))
        .attr('height', y1.bandwidth())
        .attr('x', x(0))
        .attr('width', 0)
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
            .attr('fill', 'steelblue');
        })
        .merge(svg)
        .transition(t)
        .attrTween('height', widthTween)
        .attr('width', (d) => x(d.value) - x(0));

      // bars
      //   .append('text')
      //   .attr('class', 'label')
      //   .attr('y', (d) => y1(d.name) + y1.bandwidth())
      //   .attr('x', (d) => x(d.value) + 3)
      //   .attr('fill', '#000000')
      //   .attr('zIndex', 100)
      //   .text(function (d) {
      //     return d.value;
      //   });

      // svg
      //   .select('.x-axis')
      //   .selectAll('text')
      //   .attr('transform', 'rotate(-90) translate(-2,-9)')
      //   .attr('text-anchor', 'end')
      //   .attr('color', 'black')
      //   .attr('font-size', 15);

      svg
        .select('.y-axis')
        .selectAll('text')
        .attr('transform', 'translate(-35,0)')
        .attr('font-size', 14);

      // svg
      //   .select('.plot-area')
      //   .selectAll('.bar')
      //   .data(data)
      //   .join('text')
      //   .attr('class', 'label')
      //   .attr('y', (d) => y1(d.name) + y1.bandwidth() / 2 + 4)
      //   .attr('x', (d) => x(d.value) + 3)
      //   .text(function (d) {
      //     return d.value;
      //   });

      svg.call(tip);
    },
    [data.length]
  );

  // OG Values: height: 72%, width: 74%
  // 80, 85
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${addDims ? height + 100 : height} ${
        addDims ? width + 35 : width + 30
      }`}
      style={{
        height: '72%',
        width: '74%',
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
      <g className="tooltip-area">
        <text className="tooltip-area__text">aas</text>
      </g>
    </svg>
  );
};

export default HBarChart;
