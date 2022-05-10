import React, { useEffect, useRef } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
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

const bodyReg = ['lower body', 'mid section', 'upper body'];
const cat = ['core', 'power', 'assistance'];
const plane = ['sagittal', 'transverse', 'frontal'];
const exeTypes = [
  'resistance',
  'plyometric',
  'locomotion',
  'core strength',
  'agility',
  'change of direction',
  'stretch',
];
const res = ['free weights', 'machine', 'variable', 'body weight'];
const sides = ['unilateral', 'bilateral'];

// Important Note: addDims adjusts pieChart dims based on the respective page
const PieChart2 = ({ data, type }) => {
  switch (type) {
    case 'bodyReg':
      bodyReg.map((ele) => {
        var nameIndex = data.findIndex((obj) => obj.name === ele);

        if (nameIndex == -1) {
          data.push({ name: ele, value: 0 });
        }
      });
      break;
    case 'cat':
      cat.map((ele) => {
        var nameIndex = data.findIndex((obj) => obj.name === ele);

        if (nameIndex == -1) {
          data.push({ name: ele, value: 0 });
        }
      });
      break;
    case 'plane':
      plane.map((ele) => {
        var nameIndex = data.findIndex((obj) => obj.name === ele);

        if (nameIndex == -1) {
          data.push({ name: ele, value: 0 });
        }
      });
      break;
    case 'res':
      res.map((ele) => {
        var nameIndex = data.findIndex((obj) => obj.name === ele);

        if (nameIndex == -1) {
          data.push({ name: ele, value: 0 });
        }
      });
      break;
    case 'side':
      sides.map((ele) => {
        var nameIndex = data.findIndex((obj) => obj.name === ele);

        if (nameIndex == -1) {
          data.push({ name: ele, value: 0 });
        }
      });
      break;
    case 'exeTypes':
      exeTypes.map((ele) => {
        var nameIndex = data.findIndex((obj) => obj.name === ele);

        if (nameIndex == -1) {
          data.push({ name: ele, value: 0 });
        }
      });
      break;
    default:
      break;
  }

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <ResponsiveContainer
      width={matches ? '100%' : '80%'}
      height={matches ? '100%' : '80%'}
    >
      <PieChart>
        <Tooltip />
        <Legend verticalAlign="top" />
        <Pie
          data={data}
          cx="50%"
          cy="35%"
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

export default PieChart2;
