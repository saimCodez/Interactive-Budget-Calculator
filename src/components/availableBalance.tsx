import { useBudget } from "../context/budgetContext";

const AvailableBalance = () => {
  const { availableBalance } = useBudget();
  return (
    <div className=" flex items-center bg-[#455A64] rounded-lg md:w-[1280px] md:h-[139px] w-[328px] h-[83px] mx-auto">
      <div className="md:ml-[40px] ml-[16px] flex flex-col lg:gap-[11px] gap-[8px]">
        <h4 className="text-[#FFFFFFB2] md:text-[15px] text-[14px] font-medium font-Inter">
          Available balance
        </h4>
        <h1 className="text-white md:text-[29px] text-[24px] font-semibold font-Inter leading-[34px]">
          ${availableBalance ? availableBalance : "0.00"}
        </h1>
      </div>
    </div>
  );
};

export default AvailableBalance;
