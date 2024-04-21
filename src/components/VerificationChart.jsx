import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the necessary components for the chart
ChartJS.register(ArcElement, Tooltip, Legend);

export default function VerificationChart() {
  // Generate mock data within the component
  const totalTransactions = 1000;
  const verifiedLegitimate = Math.round(totalTransactions * 0.7); // 70% are verified as legitimate
  const verifiedFraud = Math.round(totalTransactions * 0.2); // 20% are verified as fraud
  const unverified = totalTransactions - (verifiedLegitimate + verifiedFraud); // Remaining are unverified

  const chartData = {
    datasets: [
      {
        data: [verifiedLegitimate, verifiedFraud, unverified],
        backgroundColor: ['#bfdbfe', '#fde68a', '#fca5a5'], // Using Tailwind colors in hex
        hoverOffset: 4,
        borderWidth: 2,
        borderColor: '#ffffff',
        cutout: '80%', // This makes the chart a doughnut
      },
    ],
  };

  return (
    <div className="text-center flex flex-col items-center h-full justify-center gap-y-2 rounded-2xl bg-white border p-4 shadow-md">
      <h3 className="font-semibold">Verificare Tranzacții</h3>
      <div className="aspect-square px-8 flex items-center justify-center w-full">
        <Doughnut data={chartData} />
      </div>
      <div className="flex flex-col w-fit gap-y-2">
        <div className="flex flex-row gap-x-2 ">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
            {verifiedLegitimate}
          </span>
          <span className="text-sm text-gray-500"> Legitime</span>
        </div>
        <div className="flex flex-row gap-x-2 ">
          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            {verifiedFraud}
          </span>
          <span className="text-sm text-gray-500"> Fraude</span>
        </div>
        <div className="flex flex-row gap-x-2 ">
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
            {unverified}
          </span>
          <span className="text-sm text-gray-500"> Nesigur</span>
        </div>
      </div>
    </div>
  );
}
