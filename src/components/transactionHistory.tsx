import { useBudget } from "../context/budgetContext";
import { TransactionCard } from "./transactionCard";

const TransactionHistory = () => {
  const { transactionHistory } = useBudget();
  return (
    <>
      <div className="md:w-[448px] md:h-[623px] h-[380px] w-[328px] md:bg-[#F9F9F9] rounded-lg overflow-auto">
        <div className="flex items-center text-center justify-between md:px-[40px] px-0 md:pt-[40px] pt-0 sticky top-0 z-50  md:bg-[#F9F9F9] bg-white md:pb-5 pb-2">
          <div className="">
            <h1 className="font-Inter font-semibold md:text-[27px] text-[20px] leading-[42px] text-[#030303] ">
              Transaction History
            </h1>
          </div>
          <div className="flex items-center justify-center text-white font-semibold font-Inter md:text-lg text-sm bg-[#455A64] rounded-full md:w-8 md:h-8 w-6 h-6">
            {transactionHistory.length}
          </div>
        </div>

        {transactionHistory.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </>
  );
};

export default TransactionHistory;
