import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const total = transactions.reduce((acc, item) => acc + item.amount, 0).toFixed(2);

  return (
    <div className="text-center p-5 bg-gray-100 dark:bg-gray-700 rounded-md">
      <h3 className="text-lg">Your Balance</h3>
      <h2 className={`text-3xl font-bold ${total >= 0 ? "text-green-500" : "text-red-500"}`}>
        ₹{total}
      </h2>
    </div>
  );
};

export default Balance;
