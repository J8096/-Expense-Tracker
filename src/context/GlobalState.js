import { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // ✅ Keep this if you use it

const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        transactions: [{ id: uuidv4(), ...action.payload }, ...state.transactions],
      };
    case "DELETE_TRANSACTION":
      return {
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  return (
    <GlobalContext.Provider value={{ transactions: state.transactions, addTransaction, deleteTransaction }}>
      {children}
    </GlobalContext.Provider>
  );
};
