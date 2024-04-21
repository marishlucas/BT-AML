import BarChart from '../components/Bar.jsx';
import TransactionsSummary from '../components/TransactionsSummary.jsx';
import VerificationChart from '../components/VerificationChart.jsx';

async function fetchData() {
  const response = await fetch('https://62.121.70.17:7893/transactions');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function Home() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4">
      <div className="px-4 sm:px-0 mb-8">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Statistici
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Statistici despre tranzactiile din ultimele 12 luni
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 md:col-span-2 order-1">
          <TransactionsSummary
            total={34000}
            fraudulent={300}
          />
        </div>
        <div className="shadow-md p-4 bg-white rounded-2xl border col-span-12 md:col-span-7 order-3 md:order-2">
          <BarChart />
        </div>
        <div className="col-span-6 md:col-span-3 order-2">
          <VerificationChart />
        </div>
      </div>
    </div>
  );
}
