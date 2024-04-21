import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function Transaction() {
  let { id } = useParams();

  async function fetchData() {
    const response = await fetch(`http://62.121.70.17:7893/transactions/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchData,
  });

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="mt-24 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    data && (
      <div className="divide-y divide-gray-100 rounded-lg bg-white shadow-lg max-w-7xl mx-auto p-4 sm:p-8 mt-16">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Detalii tranzacție
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Detalii despre tranzactie
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Probabilitate spălare bani
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data[0] && data[0].Is_Laundering ? (
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    <svg
                      className="h-1.5 w-1.5 fill-red-500"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle
                        cx={3}
                        cy={3}
                        r={3}
                      />
                    </svg>
                    {(100 - Number(data[0].Probability) * 100).toFixed(2)}%
                    Spălare de bani
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    <svg
                      className="h-1.5 w-1.5 fill-green-500"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle
                        cx={3}
                        cy={3}
                        r={3}
                      />
                    </svg>
                    {(100 - Number(data[0].Probability) * 100).toFixed(2)}%
                    Legitim
                  </span>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Cont Expeditor
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data[0].Account}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Cont Destinatar
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data[0].Account_1}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Sumă trimisă
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {parseFloat(data[0].Amount_Paid).toFixed(2)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Sumă primită
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {parseFloat(data[0].Amount_Received).toFixed(2)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                De la banca
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                #{data[0].From_Bank}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                La banca
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                #{data[0].To_Bank}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Valută trimisă
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data[0].Payment_Currency}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Valută primită
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data[0].Receiving_Currency}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Format plată
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data[0].Payment_Format}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    )
  );
}
