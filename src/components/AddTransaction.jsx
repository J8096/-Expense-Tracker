import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuidv4 } from "uuid";

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    addTransaction({ id: uuidv4(), text, amount: +amount });
    setText("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input className="border p-2 w-full mb-2" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
      <input className="border p-2 w-full" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2 w-full">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
