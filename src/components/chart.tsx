import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useBudget } from "../context/budgetContext";

ChartJS.register(ArcElement, Tooltip);

const incomeLabels = ["Salary", "Rental Income", "Business", "Stocks"];
const expenseLabels = ["Shopping", "Food", "Entertainment", "Grocery"];
const colors = ["#04BFDA", "#9B88ED", "#FB67CA", "#FFA84A"];

const FinancialSummaryChart = () => {
  const { transactionHistory } = useBudget();

  const prepareData = (labels: string[], type: "Income" | "Expense") =>
    labels.map(
      (label) =>
        transactionHistory
          .filter((t) => t.type === type && t.category === label)
          .reduce((sum, t) => sum + t.amount, 0) || 0
    );

  const incomeData = prepareData(incomeLabels, "Income");
  const expenseData = prepareData(expenseLabels, "Expense");

  const renderChart = (labels: string[], data: number[], title: string) => {
    const total = data.reduce((a, b) => a + b, 0);
    if (total === 0) return null;

    const percentages = data.map((val) =>
      total ? `${Math.round((val / total) * 100)}%` : "0%"
    );

    const chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    };

    const chartOptions = {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context: any) =>
              `${context.label}: ${context.formattedValue}`,
          },
        },
      },
      cutout: "75%",
      responsive: true,
      maintainAspectRatio: false,
    };

    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-[16px] leading-[24px]">{title}</h1>
        <div className="flex items-center gap-4">
          {/* Chart */}
          <div className="w-[200px] h-[200px] relative">
            {/* Percentage Labels on Chart */}
            <div className="absolute inset-0">
              <Doughnut data={chartData} options={chartOptions} />
              {data.map((val, i) => {
                if (val === 0) return null;
                const angle =
                  (data.slice(0, i).reduce((acc, v) => acc + v, 0) + val / 2) /
                  total;

                const radians = angle * 2 * Math.PI;
                const radius = 87;
                const x = 101 + radius * Math.cos(radians);
                const y = 100 + radius * Math.sin(radians);

                return (
                  <div
                    key={i}
                    className="text-[11px] font-[600] text-white leading-[0.17px] absolute"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {percentages[i]}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Labels */}
          <div className="text-[12px] flex flex-col gap-2">
            {labels.map(
              (label, i) =>
                data[i] > 0 && (
                  <div
                    className="flex items-center mb-1.5 text-[#848A9C] font-normal  md:ml-8 ml-2 text-[12px]"
                    key={label}
                  >
                    <span
                      className="w-3 h-3 inline-block  border-2 rounded-full mr-2"
                      style={{
                        borderColor: colors[i],
                        backgroundColor: "transparent",
                      }}
                    />
                    {label}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-[40px] ml-2">
      {renderChart(incomeLabels, incomeData, "Income")}
      {renderChart(expenseLabels, expenseData, "Expense")}
    </div>
  );
};

export default FinancialSummaryChart;
