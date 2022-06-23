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
  Label,
} from 'recharts';

const data = [
  {
    name: 'Single Leg',
    value: 6,
  },
  {
    name: 'Sagittal',
    value: 10,
  },
  {
    name: 'Plyometric',
    value: 8,
  },
  {
    name: 'Overhead',
    value: 4,
  },
  {
    name: 'Isometric',
    value: 2,
  },
];

const BarChartLanding = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name">
          <Label
            value={'General Tags'}
            offset={220}
            position="top"
            fontFamily="quicksand"
            fontWeight={700}
          />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartLanding;
