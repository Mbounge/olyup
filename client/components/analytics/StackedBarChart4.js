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

const keys = ['primary', 'secondary'];

const colorSet = {
  primary: '#9b19f5', //#9b19f5 // purple
  secondary: '#5ad45a', //#5ad45a // greenish
};

// this graph is used for the target muscles
const StackedBarChart4 = ({ data }) => {
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

export default StackedBarChart4;
