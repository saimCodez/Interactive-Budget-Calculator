import { useNavigate } from "react-router-dom";
import FinancialSummaryChart from "./chart";
import { ArrowLeft } from "lucide-react";

const FinancialSummary = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="mx-auto md:w-[448px] md:h-[623px] md:bg-[#F9F9F9] bg-white rounded-lg">
      <div className="md:hidden mt-4 md:ml-0 ml-4">
        <button
          onClick={handleBackClick}
          className="flex items-center text-center transition-all duration-300 hover:scale-105 hover:text-gray-600 active:scale-95"
        >
          <ArrowLeft
            size={20}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <div className="ml-1">
            <h1 className="font-Inter font-medium text-sm transition-colors duration-300 group-hover:text-gray-600">
              Back
            </h1>
          </div>
        </button>
      </div>
      <div className="pt-[40px]">
        <h1 className="md:ml-[40px] ml-5 font-Inter font-semibold text-[27px] leading-[42px] text-[#030303]">
          Financial Summary
        </h1>
        <div className="md:ml-[33.5px] ml-5 mt-4">
          <FinancialSummaryChart />
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
