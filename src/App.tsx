import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTransaction from "./components/addTransaction";
import AvailableBalance from "./components/availableBalance";
import Expense from "./components/expense";
import FinancialSummary from "./components/financialSummary";
import FunctionalButtons from "./components/functionalButtons";
import Income from "./components/income";
import TransactionHistory from "./components/transactionHistory";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/add-transaction"
            element={
              <div className="md:hidden">
                <AddTransaction />
              </div>
            }
          />
          <Route
            path="/financial-summary"
            element={
              <div className="md:hidden">
                <FinancialSummary />
              </div>
            }
          />

          <Route
            path="/*"
            element={
              <div className="bg-white min-h-screen md:mt-[80px] mt-[24px] md:mb-[80px]">
                <AvailableBalance />
                <div className="flex md:gap-6 gap-2 md:mt-6 mt-2 mx-auto justify-center">
                  <Income />
                  <Expense />
                </div>
                <div className="flex  md:gap-6 gap-0 md:mt-6 mt-2 mx-auto justify-center">
                  <div className="hidden md:block">
                    <AddTransaction />
                  </div>
                  <div className="">
                    <TransactionHistory />
                  </div>
                  <div className="hidden md:block">
                    <FinancialSummary />
                  </div>
                </div>

                <div className="block md:hidden pt-2">
                  <FunctionalButtons />
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
