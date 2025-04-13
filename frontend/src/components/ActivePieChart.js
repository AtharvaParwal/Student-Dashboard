import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ActivePieChart = ({ students }) => {
  if (!Array.isArray(students)) {
    return <p>Loading pie chart data...</p>; 
  }

  const activeCount = students.filter((s) => s.active).length;
  const inactiveCount = students.length - activeCount;

  const data = [
    { name: "Active", value: activeCount },
    { name: "Inactive", value: inactiveCount },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div className="chart-container">
      <h3>Active vs Inactive Students</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivePieChart;
