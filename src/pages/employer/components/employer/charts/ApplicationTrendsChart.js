import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', applications: 20 },
  { month: 'Feb', applications: 35 },
  { month: 'Mar', applications: 40 },
  { month: 'Apr', applications: 25 },
  { month: 'May', applications: 50 },
];

const ApplicationTrendsChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="applications" fill="#007bff" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export default ApplicationTrendsChart;
