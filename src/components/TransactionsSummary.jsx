export default function TransactionsSummary({ ok, fraudulent }) {
  const percentage = ((fraudulent / ok) * 100).toFixed(2); // Calculate percentage

  return (
    <div className="flex flex-col !w-full max-w-full p-3 justify-between gap-y-3 md:w-fit bg-white rounded-xl border shadow-md h-full">
      <div className="text-center flex flex-col justify-center h-full gap-y-2 rounded-lg bg-blue-200 border p-4">
        <h3 className="">Total Transactions</h3>
        <p className="text-2xl font-bold">
          {(ok + fraudulent).toLocaleString()}
        </p>
      </div>
      <div className="text-center flex flex-col h-full justify-center gap-y-2 rounded-lg bg-yellow-200 border p-4">
        <h3 className=" ">Fraudulent</h3>
        <p className="text-2xl font-bold">{fraudulent.toLocaleString()}</p>
      </div>
      <div className="text-center flex flex-col h-full justify-center gap-y-2 rounded-lg bg-red-300 border p-4">
        <h3 className=" ">Percentage Fraudulent</h3>
        <p className="text-2xl font-bold">{percentage}%</p>
      </div>
    </div>
  );
}
