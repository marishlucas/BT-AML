import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

async function fetchData(page) {
  const response = await fetch(
    `http://62.121.70.17:7893/transactions?page=${page}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ['transactions', currentPage],
    queryFn: () => fetchData(currentPage),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div className="text-xl text-center mt-32">Loading...</div>;
  }

  if (error instanceof Error) {
    return (
      <div className="text-xl text-center mt-32">
        An error occurred: {error.message}
      </div>
    );
  }
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Transactions
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A table of placeholder stock market data that does not make any
            sense.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-500 transition px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            Export
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 pb-10 align-middle sm:px-6 lg:px-8">
            <table className="mx-4 md:mx-0 border shadow-md min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
                  >
                    ID Tranzacție
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    De la cont
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    La cont
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Fonduri primite
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Fonduri trimise
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Valută trimitere
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Valută primire
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Șansă fraudă
                  </th>
                  <th
                    scope="col"
                    className="relative whitespace-nowrap py-3.5 pl-3 pr-4 "
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.transactions.map((transaction) => (
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
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                      {transaction.Payment_Currency}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                      {transaction.Receiving_Currency}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                      {transaction.Probability >= 0 &&
                        transaction.Probability <= 0.4 && (
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
                            {transaction.Probability * 100}%
                          </span>
                        )}
                      {transaction.Probability > 0.4 &&
                        transaction.Probability <= 0.6 && (
                          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                            <svg
                              className="h-1.5 w-1.5 fill-yellow-500"
                              viewBox="0 0 6 6"
                              aria-hidden="true"
                            >
                              <circle
                                cx={3}
                                cy={3}
                                r={3}
                              />
                            </svg>
                            {transaction.Probability * 100}%
                          </span>
                        )}
                      {transaction.Probability > 0.6 &&
                        transaction.Probability <= 1 && (
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
                            {transaction.Probability * 100}%
                          </span>
                        )}
                    </td>
                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium ">
                      <a
                        href="#"
                        className="text-blue-500 hover:text-blue-900 transition"
                      >
                        info {'->'}
                        <span className="sr-only">, {transaction.id}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav
              className="flex items-center justify-between border-t border-gray-200 py-3 "
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{data.meta.from}</span>{' '}
                  to <span className="font-medium">{data.meta.to}</span> of{' '}
                  <span className="font-medium">{data.meta.total}</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <button
                  onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-white relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                  Înapoi
                </button>
                <button
                  onClick={() => setCurrentPage((old) => old + 1)}
                  className="bg-white relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                  Înainte
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
