import type { ReactNode } from "react";

export type TransactionType = {
  id: string;
  amount: number;
  type: "Income" | "Expense";
  category: string;
  description: any;
};

export interface BudgetContextValue {
  income: number;
  availableBalance: number;
  expense: number;
  addTransaction: (data: TransactionType) => void;
  transactionHistory: TransactionType[];
  deleteTransaction: any;
}

export interface BudgetContextProviderProps {
  children: ReactNode;
}
