import Bank from "../assets/images/bank.png";
import { useBudget } from "../context/budgetContext";

const Income = () => {
  const { income } = useBudget();
  return (
    <div className="flex items-center bg-[#D9E7E5] md:w-[628px] md:h-[139px]  w-[159px] h-[139px] rounded-[8px] ">
      <div className="flex flex-col md:ml-[40px] ml-[16px] gap-[3px]">
        <div className="flex justify-center items-center bg-[#42887C] rounded-full h-[40px] w-[40px] mb-2">
          <img src={Bank} className="" alt="" />
        </div>
        <h1 className="text-black font-[700] text-[17px] leading-[24px] font-Inter">
          ${income ? income : "0.00"}
        </h1>
        <h4 className="text-[14px] leading-[100%] font-[400] text-[#686868] font-Inter">
          Income
        </h4>
      </div>
    </div>
  );
};

export default Income;
