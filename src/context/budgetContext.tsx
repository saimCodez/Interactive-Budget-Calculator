import { createContext, useContext, useEffect, useState } from "react";
import {
  type BudgetContextProviderProps,
  type BudgetContextValue,
  type TransactionType,
} from "../types";

// Create context
const BudgetContext = createContext<BudgetContextValue>(
  {} as BudgetContextValue
);

// Provider
const BudgetContextProvider = ({ children }: BudgetContextProviderProps) => {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionType[]
  >([]);
  const addTransaction = (data: TransactionType) => {
    setTransactionHistory((prev) => [...prev, data]);
  };

  const deleteTransaction = (id: string) => {
    setTransactionHistory((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  useEffect(() => {
    const totalIncome = transactionHistory
      .filter((item) => item.type === "Income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactionHistory
      .filter((item) => item.type === "Expense")
      .reduce((sum, item) => sum + item.amount, 0);

    setIncome(totalIncome);
    setExpense(totalExpense);
    setAvailableBalance(totalIncome - totalExpense);
  }, [transactionHistory]);

  const contextValue: BudgetContextValue = {
    addTransaction,
    income,
    expense,
    availableBalance,
    transactionHistory,
    deleteTransaction,
  };

  return (
    <BudgetContext.Provider value={contextValue}>
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetContextProvider;

// Custom hook
export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetContextProvider");
  }
  return context;
};
