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
import { useMediaQuery } from '@material-ui/core';

const d3 = {
  ...d3module,
  tip: d3tip,
};

const data = [
  {
    name: 'Muscles',
    biceps: 4,
    triceps: 2,
    quadriceps: 5,
    hamstrings: 1,
  },
  {
    name: 'Shoulder',
    flexion: 3,
    'upward rotation': 5,
    'internal rotation': 2,
  },
  {
    name: 'Exercises',
    'back squat': 4,
    snatch: 6,
  },
  {
    name: 'Stats',
    compound: 5,
    'double-leg': 3,
    'single-arm': 2,
    olympic: 3,
  },
  {
    name: 'Goals',
    hypertrophy: 4,
    power: 2,
    'speed-strength': 2,
  },
];

const keys = [
  'biceps',
  'triceps',
  'quadriceps',
  'hamstrings',
  'flexion',
  'upward rotation',
  'internal rotation',
  'back squat',
  'snatch',
  'compound',
  'double-leg',
  'single-arm',
  'olympic',
  'hypertrophy',
  'power',
  'speed-strength',
];

const colorSet = {
  biceps: '#9b19f5', //#9b19f5 // purple
  triceps: '#5ad45a', //#5ad45a // greenish
  quadriceps: '#ffa300', // #ffa300 // orange
  hamstrings: '#dc0ab4', // #dc0ab4 // red purple
  flexion: '#4421af', // #4421af // dark blue
  'upward rotation': '#00b7c7', // #00b7c7 // lime green
  'internal rotation': '#363445', // #363445 // navy blue
  'back squat': '#BBA14F', // #e2e2e2 // dull gold
  snatch: '#e27c7c', // #e27c7c // salmon
  compound: '#6d4b4b', // #6d4b4b // grenn brown
  'double-leg': '#63bff0', // #63bff0 // aqua
  'single-arm': '#e4bcad', // "#e4bcad" // peach
  olympic: '#e1a692', // #e1a692 // light red
  hypertrophy: '#FCE205', // #000000 // black
  power: '#50e991', // #50e991 // light green
  'speed-strength': '#a7d5ed', // "#a7d5ed" // dull blue purpleish
};

const StackedBarLanding = () => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <ResponsiveContainer
      width={matches ? '100%' : '99%'}
      height={matches ? '100%' : '99%'}
    >
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

export default StackedBarLanding;
