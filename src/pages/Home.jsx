import { useQuery } from '@tanstack/react-query';
import BarChart from '../components/Bar.jsx';
import TransactionsSummary from '../components/TransactionsSummary.jsx';
import VerificationChart from '../components/VerificationChart.jsx';
import { Link } from 'react-router-dom';

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
];

async function fetchData() {
  const response = await fetch(`http://62.121.70.17:7893/transactions`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function fetchStats() {
  const response = await fetch(`http://62.121.70.17:7893/transaction-stats`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchData,
    keepPreviousData: true,
  });

  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useQuery({
    queryKey: ['transaction-stats'],
    queryFn: fetchStats,
    keepPreviousData: true,
  });

  if (isLoading || isLoading2) {
    return (
      <div className="text-xl flex flex-row flex-wrap items-center justify-center gap-x-8 text-center mt-32 mx-6">
        <div
          role="status"
          class="max-w-md  p-4 border border-gray-200 rounded-xl shadow animate-pulse md:p-6 "
        >
          <div class="h-2.5 bg-gray-200 rounded-full  w-32 mb-2.5"></div>
          <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full "></div>
          <div class="flex items-baseline mt-4">
            <div class="w-full bg-gray-200 rounded-t-lg h-72 "></div>
            <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
            <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          class="max-w-md p-4 border border-gray-200 rounded-xl shadow animate-pulse md:p-6 "
        >
          <div class="h-2.5 bg-gray-200 rounded-full  w-32 mb-2.5"></div>
          <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full "></div>
          <div class="flex items-baseline mt-4">
            <div class="w-full bg-gray-200 rounded-t-lg h-72 "></div>
            <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
            <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          class="max-w-md rounded-xl p-4 border border-gray-200  shadow animate-pulse md:p-6 "
        >
          <div class="h-2.5 bg-gray-200 rounded-full  w-32 mb-2.5"></div>
          <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full "></div>
          <div class="flex items-baseline mt-4">
            <div class="w-full bg-gray-200 rounded-t-lg h-72 "></div>
            <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
            <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          class="max-w-md p-4 border border-gray-200 rounded-xl shadow animate-pulse md:p-6 "
        >
          <div class="h-2.5 bg-gray-200 rounded-full  w-32 mb-2.5"></div>
          <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full "></div>
          <div class="flex items-baseline mt-4">
            <div class="w-full bg-gray-200 rounded-t-lg h-72 "></div>
            <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
            <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
            <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Check if either query has encountered an error
  if (error || error2) {
    const errorMessage = error?.message || error2?.message; // Safely access error messages
    return (
      <div className="text-xl text-center mt-32">
        An error occurred: {errorMessage}
      </div>
    );
  }

  // Ensure data2 has the necessary properties
  if (
    !data2 ||
    typeof data2.ok === 'undefined' ||
    typeof data2.ml === 'undefined'
  ) {
    return <div className="text-xl text-center mt-32">Data is missing</div>;
  }
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
        <div className="col-span-6 xl:col-span-2 order-1">
          <TransactionsSummary
            ok={data2.ok}
            fraudulent={data2.ml}
          />
        </div>
        <div className="shadow-md p-4 bg-white rounded-2xl border col-span-12 xl:col-span-7 xl:col-span-5 order-3 xl:order-2">
          <BarChart />
        </div>
        <div className="col-span-6 xl:col-span-3 order-2">
          <VerificationChart />
        </div>
        <div className="col-span-6 md:col-span-12 order-3">
          <div className="p-4 bg-white rounded-2xl min-w-fit border shadow-md">
            <h2>Ultimele tranzacții</h2>
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      De la
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      La
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Bani trimiși
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Bani primiți
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.transactions.slice(0, 3).map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500">
                        {transaction.id}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {transaction.Account}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {transaction.Account_1}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {transaction.Amount_Paid}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {transaction.Amount_Received}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          info {'->'}
                          <span className="sr-only">, {transaction.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-6">
                <Link
                  to="/transactions"
                  className="text-blue-600 underline hover:text-blue-900 text-center"
                >
                  Vezi mai mult {'->'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
