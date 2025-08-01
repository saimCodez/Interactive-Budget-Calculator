import { useNavigate } from "react-router-dom";

const FunctionalButtons = () => {
  const navigate = useNavigate();

  const handleTransactionClick = () => {
    navigate("/add-transaction");
  };
  const handleSummaryClick = () => {
    navigate("/financial-summary");
  };

  return (
    <div className="flex mx-auto gap-2 mt-2 items-center justify-center mb-6">
      <button
        onClick={handleTransactionClick}
        className="font-Inter cursor-pointer text-[14px] text-white bg-[#FFC727] hover:bg-yellow-500 h-[44px] w-[159px] rounded-lg font-[600] leading-[24px]"
      >
        Add Transaction
      </button>
      <button
        onClick={handleSummaryClick}
        className="font-Inter text-[14px] cursor-pointer text-white bg-[#FFC727] hover:bg-yellow-500 h-[44px] w-[159px] rounded-lg font-[600] leading-[24px]"
      >
        Financial Summary
      </button>
    </div>
  );
};

export default FunctionalButtons;
