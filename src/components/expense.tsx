import Frame from "../assets/images/Frame.png";
import { useBudget } from "../context/budgetContext";

const Expense = () => {
  const { expense } = useBudget();
  return (
    <div className="flex items-center bg-[#E6E2E6]  md:w-[628px] md:h-[139px] w-[159px] h-[139px] rounded-[8px]">
      <div className="flex flex-col md:ml-[40px] ml-[16px] gap-[3px]">
        <div>
          <img src={Frame} className="mb-2" alt="" />
        </div>
        <h1 className="text-black font-[700] text-[17px] leading-[24px] font-Inter">
          ${expense ? expense : "0.00"}
        </h1>
        <h4 className="text-[14px] leading-[100%] font-[400] text-[#686868] font-Inter">
          Expenses
        </h4>
      </div>
    </div>
  );
};

export default Expense;
