import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryColors = {
  Food: "#E74C3C",
  Rent: "#3498DB",
  Travel: "#F1C40F",
  Shopping: "#2ECC71",
  Entertainment: "#8E44AD",
  Health: "#E67E22",
};

const SpendingChart = ({ transactions }) => {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (transaction.amount < 0) {
      acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map((cat) => categoryColors[cat] || "#95A5A6"),
      },
    ],
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-bold">Spending Breakdown</h3>
      {Object.keys(categoryTotals).length > 0 ? <Doughnut data={data} /> : <p>No spending data</p>}
    </div>
  );
};

export default SpendingChart;
