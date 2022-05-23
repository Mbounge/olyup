import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Label,
} from 'recharts';

import { useMediaQuery } from '@material-ui/core';

const AreaChart2 = ({ data, measurement, type, selectedName, button }) => {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const data3 = [
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

  var data2 = [
    { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
    { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
    { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
    { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
  ];

  var item;

  try {
    item = Object.keys(data[0]);
  } catch {
    item = ['year', 'sam', 'joe'];
  }

  const colorSet = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#9b19f5',
    '#5ad45a',
    '#ffa300',
    '#dc0ab4',
    '#0bb4ff',
    '#b30000',
    '#b30000',
    '#4421af',
    '#00b7c7',
    '#363445',
    '#BBA14F',
    '#e27c7c',
    '#6d4b4b',
    '#63bff0',
    '#e4bcad',
    '#e1a692',
    '#a7d5ed',
    '#50e991',
  ];

  console.log(item);

  const matches = useMediaQuery('(min-width:600px)');

  const dateFormatter = (value, index) => {
    if (value) {
      const limit = 10; // put your maximum character
      if (value.length < limit) return value;
      return `${value.substring(0, limit)}`;
    }
  };

  const valueFormatter = (value, index) => {
    const limit = 10; // put your maximum character

    return `${value} ${measurement}`;
  };

  return (
    <ResponsiveContainer
      width={matches ? '100%' : '99%'}
      height={matches ? '100%' : '99%'}
    >
      <AreaChart
        data={data}
        margin={{
          top: matches ? 10 : 0,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" tickFormatter={dateFormatter}>
          <Label
            value={button}
            offset={350}
            position="top"
            fontFamily="quicksand"
            fontWeight={700}
          />
        </XAxis>

        <YAxis tickFormatter={valueFormatter} width={100} />

        <Tooltip labelFormatter={dateFormatter} />

        {type == 'multi' ? (
          <React.Fragment>
            {item.map((name, index) => {
              if (name === 'year') {
              } else {
                const num = randomIntFromInterval(0, 20);
                return (
                  <Area
                    key={`${index}${name}`}
                    type="monotone"
                    dataKey={item[index]}
                    stackId="1"
                    stroke={colorSet[num]}
                    fill={colorSet[num]}
                  />
                );
              }
            })}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {item.map((name, index) => {
              if (name === selectedName) {
                const num = randomIntFromInterval(0, 20);
                return (
                  <Area
                    key={`${index}${name}`}
                    type="monotone"
                    dataKey={item[index]}
                    stackId="1"
                    stroke={colorSet[num]}
                    fill={colorSet[num]}
                  />
                );
              }
            })}
          </React.Fragment>
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart2;
