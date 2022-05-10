import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import * as d3module from 'd3';
import d3tip from 'd3-tip';

const d3 = {
  ...d3module,
  tip: d3tip,
};

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dataStacked = [
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
    adduction: 3,
    'internal rotation': 5,
    'external rotation': 1,
  },
];

const keys = [
  'flexion',
  'extension',
  'transverse flexion',
  'transverse extension',
  'internal rotation',
  'external rotation',
  'rotation',
  'anti-rotation',
  'upward rotation',
  'downward rotation',
  'abduction',
  'transverse abduction',
  'adduction',
  'transverse adduction',
  'elevation',
  'depression',
  'plantar flexion',
  'dorsi flexion',
];

const colorSet = {
  flexion: '#9b19f5', //#9b19f5 // purple
  extension: '#5ad45a', //#5ad45a // greenish
  abduction: '#ffa300', // #ffa300 // orange
  adduction: '#dc0ab4', // #dc0ab4 // red purple
  'internal rotation': '#0bb4ff', //#0bb4ff // light blue
  'external rotation': '#b30000', //#b30000 // brown red
  'transverse adduction': '#4421af', // #4421af // dark blue
  'transverse abduction': '#00b7c7', // #00b7c7 // lime green
  rotation: '#363445', // #363445 // navy blue
  'anti-rotation': '#BBA14F', // #e2e2e2 // dull gold
  elevation: '#e27c7c', // #e27c7c // salmon
  depression: '#6d4b4b', // #6d4b4b // grenn brown
  'plantar flexion': '#63bff0', // #63bff0 // aqua
  'dorsi flexion': '#e4bcad', // "#e4bcad" // peach
  'upward rotation': '#e1a692', // #e1a692 // light red
  'downward rotation': '#000000', // #000000 // black
  'transverse extension': '#50e991', // #50e991 // light green
  'transverse flexion': '#a7d5ed', // "#a7d5ed" // dull blue purpleish
};

const StackedBarChart3 = ({ data }) => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <BarChart
        layout="vertical"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis type="number" allowDecimals={false} />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        {keys.map((key, index) => {
          return (
            <Bar
              key={`${key}${index}`}
              dataKey={key}
              stackId="a"
              fill={colorSet[key]}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart3;
