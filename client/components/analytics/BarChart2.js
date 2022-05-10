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
  Text,
} from 'recharts';
import * as d3module from 'd3';
import d3tip from 'd3-tip';
import { useMediaQuery } from '@material-ui/core';

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
    abduction: 8,
    adduction: 3,
    'internal rotation': 5,
    'external rotation': 1,
  },
];

const dataForce = [
  {
    name: 'posterior chain',
    value: 18,
  },
  {
    name: 'push',
    value: 22,
  },
  {
    name: 'rahab',
    value: 5,
  },
  {
    name: 'sagittal',
    value: 30,
  },
  {
    name: 'frontal',
    value: 10,
  },
  {
    name: 'transverse',
    value: 3,
  },
  {
    name: 'rotation',
    value: 9,
  },
  {
    name: 'single-leg',
    value: 13,
  },
  {
    name: 'press',
    value: 7,
  },
  {
    name: 'olympic',
    value: 6,
  },
  {
    name: 'hatfield',
    value: 2,
  },
  {
    name: 'overhead',
    value: 19,
  },
  {
    name: 'shoulder rehab',
    value: 19,
  },
];

const BarChart2 = ({ data }) => {
  const tickFormatter = (value, index) => {
    const limit = 10; // put your maximum character
    if (value.length < limit) return value;
    return `${value.substring(0, limit)}`;
  };

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <ResponsiveContainer
      width={matches ? '100%' : '80%'}
      height={matches ? '100%' : '80%'}
    >
      <BarChart
        layout="vertical"
        width={700}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        maxBarSize={100}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis type="number" allowDecimals={false} />

        <YAxis dataKey="name" type="category" interval={0} width={100} />

        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" label={{ fill: 'white' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChart2;
