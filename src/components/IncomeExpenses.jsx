import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2);

  return (
    <div className="grid grid-cols-2 gap-4 text-center p-5">
      <div className="bg-green-200 dark:bg-green-700 p-3 rounded-md">
        <h4>Income</h4>
        <p className="text-green-700 font-bold">₹{income}</p>
      </div>
      <div className="bg-red-200 dark:bg-red-700 p-3 rounded-md">
        <h4>Expense</h4>
        <p className="text-red-700 font-bold">₹{expense}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
