import { ArrowLeft, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useBudget } from "../context/budgetContext";
import { useNavigate } from "react-router-dom";

const incomeCategories = ["Salary", "Rental Income", "Business", "Stocks"];
const expenseCategories = ["Shopping", "Food", "Entertainment", "Grocery"];

const transactionSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),
  description: z.string().min(1, "Description is required"),
});

const AddTransaction = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | any>();
  const [description, setDescription] = useState<any>("");
  const { addTransaction } = useBudget();
  const [type, settype] = useState<"Income" | "Expense">("Income");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const categories = type == "Income" ? incomeCategories : expenseCategories;

  const [error, setError] = useState<{
    category?: string;
    amount?: string;
    description?: string;
  }>({});

  useEffect(() => {
    setSelectedCategory("");
    setAmount("");
    setDescription("");
  }, [type]);

  const onClickHandler = () => {
    // ✅ Validate using Zod
    const result = transactionSchema.safeParse({
      category: selectedCategory,
      amount,
      description,
    });

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setError(fieldErrors);
      return;
    }

    addTransaction({
      id: crypto.randomUUID(),
      type: type,
      category: selectedCategory,
      amount: Number(amount),
      description,
    });

    setSelectedCategory("");
    setAmount("");
    setDescription("");

    setError({});
    // console.log("Valid Transaction Data:", result.data);
  };

  const navigate = useNavigate();
  const onBackClick = () => {
    const result = transactionSchema.safeParse({
      category: selectedCategory,
      amount,
      description,
    });

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setError(fieldErrors);
      return;
    }

    addTransaction({
      id: crypto.randomUUID(),
      type: type,
      category: selectedCategory,
      amount: Number(amount),
      description,
    });

    setSelectedCategory("");
    setAmount("");
    setDescription("");

    setError({});
    navigate(-1);
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="w-[320px] h-[623px] md:mr-5">
          <div className="md:hidden mt-4">
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
          <h1 className="font-Inter font-semibold  md:pt-0 pt-6 md:text-[27px] text-[20px] leading-[42px] text-[#030303]">
            Add Transaction
          </h1>

          {/* Type buttons */}
          <div className="">
            <h1 className="font-Inter font-normal md:text-[16px] text-[15px] leading-[24px] md:mt-9 mt-3 mb-1.5">
              Select Type
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => settype("Income")}
                className={`rounded-lg ${
                  type == "Income"
                    ? "border-[#42887C] border-[1px] bg-[#D9E7E5] "
                    : "text-[#42887C] bg-[#D9E7E5] font-normal"
                }  cursor-pointer  md:w-[152px] md:h-[81px] w-[152px] h-[75px] text-[#030303] font-bold font-Inter md:text-[16px] text-[15px]`}
              >
                Income
              </button>
              <button
                onClick={() => settype("Expense")}
                className={`rounded-lg ${
                  type == "Expense"
                    ? "bg-[#EBEBEB] font-bold border-[#b8a6a6] border text-black"
                    : "text-[#767676] bg-[#EBEBEB]"
                } cursor-pointer  md:w-[152px] md:h-[81px] w-[152px] h-[75px] text-[#767676]  font-Inter md:text-[16px] text-[15px]`}
              >
                Expense
              </button>
            </div>
          </div>

          <div className="mt-4.75">
            <label
              className="font-Inter font-normal md:text-[16px] text-[15px] leading-[24px]"
              htmlFor=""
            >
              Category
            </label>

            <div className="relative w-[320px] mt-1.5">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full md:text-[16px] text-[15px] cursor-pointer font-Inter rounded-lg border ${
                  error.amount
                    ? "border-red-500 focus:outline-red-500"
                    : "border-gray-300"
                } focus:outline-[1px] focus:outline-gray-500 px-3 py-2 justify-between items-center`}
              >
                {selectedCategory || "Select Category"}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  color="#667085"
                />
              </button>

              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border md:text-[16px] text-[15px] border-gray-300 rounded-lg shadow-lg">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSelect(category)}
                      className="px-4 py-2 hover:bg-gray-100 rounded-md w-full text-left font-Inter cursor-pointer"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {error.category && (
              <p className="text-red-500 text-[13px] mt-1 font-Inter">
                {error.category}
              </p>
            )}
          </div>

          <div className="md:mt-4.75 mt-3">
            <label className="font-Inter md:text-[16px] text-[15px]" htmlFor="">
              Amount
            </label>
            <input
              className={`w-[320px] mt-1.5 font-Inter rounded-lg border md:text-[16px] text-[15px] ${
                error.amount
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-300"
              } focus:outline-[1px] focus:outline-gray-500 px-3 py-2`}
              placeholder="$$$"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {error.amount && (
              <p className="text-red-500 text-[13px] mt-1 font-Inter">
                {error.amount}
              </p>
            )}
          </div>

          <div className="md:mt-4.75 mt-3">
            <label className="font-Inter md:text-[16px] text-[15px]" htmlFor="">
              Description
            </label>
            <textarea
              placeholder="Enter a description..."
              className={`rounded-lg font-Inter mt-1.5 border md:text-[16px] text-[15px] ${
                error.description
                  ? "border-red-500 focus:outline-red-500"
                  : "border-gray-300"
              } border-gray-300 focus:outline-[1px] focus:outline-gray-500 px-3 py-2  w-[320px] md:h-[128px] h-[115px]`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error.description && (
              <p className="text-red-500 text-[13px] font-Inter">
                {error.description}
              </p>
            )}
          </div>

          <button
            onClick={onClickHandler}
            className="text-white bg-[#FFC727] hidden md:flex  rounded-lg w-[320px] h-[44px]  text-center md:text-[16px] text-[15px] font-Inter items-center justify-center font-semibold md:mt-5 mt-3 cursor-pointer hover:bg-yellow-500 transition-all duration-300 "
          >
            Add Transaction
          </button>
          <button
            onClick={onBackClick}
            className="text-white bg-[#FFC727] md:hidden rounded-lg w-[320px] h-[44px] flex text-center md:text-[16px] text-[15px] font-Inter items-center justify-center font-semibold md:mt-5 mt-3 cursor-pointer hover:bg-yellow-500 transition-all duration-300 "
          >
            Add Transaction
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTransaction;
