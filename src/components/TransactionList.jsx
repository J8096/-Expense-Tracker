import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(GlobalContext);

  return (
    <div className="p-5">
      <h3 className="text-xl font-semibold">History</h3>
      <ul>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`flex justify-between p-3 my-2 rounded-md shadow ${transaction.amount > 0 ? "bg-green-100" : "bg-red-100"}`}
          >
            {transaction.text} <span>₹{transaction.amount}</span>
            <button className="text-red-500" onClick={() => deleteTransaction(transaction.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
