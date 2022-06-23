import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';

const data = [
  {
    name: '2017',
    value: 218,
  },
  {
    name: '2018',
    value: 300,
  },
  {
    name: '2019',
    value: 190,
  },
  {
    name: '2020',
    value: 150,
  },
  {
    name: '2021',
    value: 400,
  },
  {
    name: '2022',
    value: 310,
  },
  {
    name: '2023',
    value: 100,
  },
];

const AreaChartLanding = () => {
  const valueFormatter = (value, index) => {
    const limit = 10; // put your maximum character

    return `${value} ${'reps'}`;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name">
          <Label
            value={'Back Squat - Total Volume'}
            offset={245}
            position="top"
            fontFamily="quicksand"
            fontWeight={700}
          />
        </XAxis>
        <YAxis tickFormatter={valueFormatter} width={75} />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartLanding;
