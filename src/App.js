import React, { useState } from "react";
import "./index.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const categories = ["Food", "Rent", "Travel", "Shopping", "Entertainment", "Health"];
const currencyOptions = ["INR", "USD", "EUR"];

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [formData, setFormData] = useState({ desc: "", amount: "", category: "Food", currency: "INR" });

  const addTransaction = () => {
    if (!formData.desc || !formData.amount) return;
    const amount = parseFloat(formData.amount);
    const newTransaction = { ...formData, amount };

    setTransactions([...transactions, newTransaction]);
    setBalance(balance + (amount > 0 ? amount : amount));
    setIncome(income + (amount > 0 ? amount : 0));
    setExpense(expense + (amount < 0 ? amount : 0));

    setFormData({ desc: "", amount: "", category: "Food", currency: "INR" });
  };

  const exportCSV = () => {
    const csvData = transactions.map(t => `${t.desc},${t.amount},${t.category},${t.currency}`).join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  const chartData = {
    labels: categories,
    datasets: [{
      data: categories.map(cat => transactions.filter(t => t.category === cat).reduce((acc, t) => acc + t.amount, 0)),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD", "#F39C12"]
    }]
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} p-6`}>
      <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-md">
        <h1 className="text-2xl font-bold text-blue-600">Expense Tracker</h1>
        <p className="font-semibold">Your Balance: <span className="text-lg">INR {balance.toFixed(2)}</span></p>

        <div className="flex justify-between my-4">
          <div className="bg-green-100 p-4 rounded-md flex-1 mx-2">
            <p className="text-green-600 font-bold">Income</p>
            <p className="text-green-800 font-bold">INR {income.toFixed(2)}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-md flex-1 mx-2">
            <p className="text-red-600 font-bold">Expense</p>
            <p className="text-red-800 font-bold">INR {expense.toFixed(2)}</p>
          </div>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Dark Mode</button>

        {/* Transaction Form */}
        <div className="bg-gray-100 p-4 rounded-md mt-4">
          <h2 className="text-lg font-semibold">Add Transaction</h2>
          <input type="text" placeholder="Enter description..." value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            className="w-full p-2 border rounded-md my-2" />

          <input type="number" placeholder="Enter amount..." value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-2 border rounded-md my-2" />

          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded-md my-2">
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>

          <select value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="w-full p-2 border rounded-md my-2">
            {currencyOptions.map(cur => <option key={cur}>{cur}</option>)}
          </select>

          <button onClick={addTransaction} className="w-full bg-blue-600 text-white p-2 rounded-md mt-2">Add Transaction</button>
        </div>

        {/* Transaction History */}
        <h2 className="text-lg font-semibold mt-4">Transaction History</h2>
        <ul className="bg-gray-100 p-4 rounded-md min-h-[80px]">
          {transactions.length === 0 ? <p>No transactions yet</p> :
            transactions.map((t, i) => (
              <li key={i} className="flex justify-between border-b py-2">
                <span>{t.desc}</span>
                <span className={t.amount > 0 ? "text-green-600" : "text-red-600"}>
                  {t.currency} {t.amount}
                </span>
              </li>
            ))}
        </ul>

        <button onClick={exportCSV} className="w-full bg-green-600 text-white p-2 rounded-md mt-2">Export as CSV</button>

        {/* Spending Breakdown */}
        <h2 className="text-lg font-semibold mt-4">Spending Breakdown</h2>
        <div className="w-64 mx-auto">
          <Pie data={chartData} />
        </div>

        <div className="flex flex-wrap justify-center mt-4">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center m-1">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}></span>
              <span className="ml-2">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
