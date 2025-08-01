import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BudgetContextProvider from "./context/budgetContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BudgetContextProvider>
      <App />
    </BudgetContextProvider>
  </StrictMode>
);
