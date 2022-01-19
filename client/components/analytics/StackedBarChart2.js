import React, { useEffect, useRef } from 'react';
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from 'd3';

/**
 * Component that renders a StackedBarChart
 */

const data = [
  {
    name: 'ankle',
    flexion: 2,
    extension: 3,
    abduction: 5,
    adduction: 1,
    'internal rotation': 2,
    'external rotation': 3,
  },
  {
    name: 'knee',
    flexion: 1,
    extension: 5,
    abduction: 8,
    adduction: 3,
    'internal rotation': 5,
    'external rotation': 1,
  },
];

const keys = [
  'flexion',
  'extension',
  'abduction',
  'adduction',
  'internal rotation',
  'external rotation',
];

const colors = {
  flexion: 'red',
  extension: 'green',
  abduction: 'blue',
  adduction: 'purple',
  'internal rotation': 'pink',
  'external rotation': 'yellow',
};

const StackedBarChart2 = () => {
  //const [data, setData] = useState(datasets);
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];
    const yScale = scaleLinear().domain(extent).range([height, 0]);

    const x0Scale = scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .padding(0.46);

    const xAix = axisBottom(x0Scale);
    const yAix = axisLeft(yScale);

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAix);
    svg
      .select('.y-axis')
      .attr('transform', `translate(${0 + 25}, 0 )`)
      .call(yAix);

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => colors[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (sequence) => x0Scale(sequence.data.name))
      .attr('width', x0Scale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      .attr('height', (sequence) => yScale(sequence[0]) - yScale(sequence[1]));
  }, [data, keys, colors]);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ width: '100%', height: '400px', marginBottom: '2rem' }}
      >
        <svg ref={svgRef} style={{ width: '100%', height: '110%' }}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};

export default StackedBarChart2;
