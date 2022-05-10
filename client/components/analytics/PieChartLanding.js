import React, { useEffect, useRef } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Label,
} from 'recharts';
import * as d3module from 'd3';
import d3tip from 'd3-tip';
import { useMediaQuery } from '@material-ui/core';

const d3 = {
  ...d3module,
  tip: d3tip,
};
import { useD3 } from '../../api/useD3';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#c80064',
  '#3b3734',
  '#b30000',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {percent === 0 ? void 0 : `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  { name: 'resistance', value: 10 },
  { name: 'plyometric', value: 3 },
  { name: 'stretch', value: 7 },
];

// Important Note: addDims adjusts pieChart dims based on the respective page
const PieChartLanding = () => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <ResponsiveContainer
      width={matches ? '100%' : '99%'}
      height={matches ? '100%' : '99%'}
    >
      <PieChart>
        <Tooltip />
        <Legend verticalAlign="top" />

        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartLanding;
