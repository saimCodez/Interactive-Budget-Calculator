import Bin from "../assets/images/bin.png";
import type { TransactionType } from "../types";
import { useBudget } from "../context/budgetContext";

export const TransactionCard = ({
  transaction,
}: {
  transaction: TransactionType;
}) => {
  const { deleteTransaction } = useBudget();

  const handleDelete = () => {
    deleteTransaction(transaction.id);
  };
  return (
    <div
      key={transaction.id}
      className="md:w-[368px] w-[328px] h-[128] md:h-[128px] bg-white md:mx-10 mx-0 rounded-lg mb-4 drop-shadow-[#4A556812] drop-shadow-md"
    >
      <div className="px-[24px] py-[16px]">
        <div className="flex justify-between">
          <h2 className="font-Inter font-medium text-[16px] text-[#838383] leading-[24px]">
            {transaction.category}
          </h2>
          <div className="flex gap-2">
            <h1
              className={`flex text-center items-center text-[14px] leading-[24px] font-semibold ${
                transaction.type == "Income"
                  ? "bg-[#ECFFEA] text-[#5AB064] w-[66px]"
                  : "text-[#B05A5A] bg-[#FFEAEA] w-[74px]"
              } justify-center font-Inter  h-[24px] rounded-2xl `}
            >
              {transaction.type}
            </h1>
            <button onClick={handleDelete}>
              <img
                src={Bin}
                className="w-[20px] h-[20px] cursor-pointer"
                alt="Delete"
              />
            </button>
          </div>
        </div>
        <div className="mt-2.25 flex">
          <h1 className="font-Inter font-bold text-[32px] leading-[24px]">
            ${transaction.amount}
          </h1>
        </div>
        <div className="mt-4.5">
          <h2 className="font-Inter font-normal text-[14px] leading-[24px] text-[#4F4F4F]">
            {transaction.description}
          </h2>
        </div>
      </div>
    </div>
  );
};
