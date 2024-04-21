import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

export default function UploadCsv() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="absolute h-full w-full grid place-items-center ">
      <div className="bg-white rounded-xl p-8 border shadow-lg flex flex-col  max-w-2xl w-full">
        <div className="flex justify-between">
          <h2 className="text-xl text-yellow-600 font-bold mb-4">
            Uploadează un fișier CSV
          </h2>
          <span className="text-gray-500">max : 128MB</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => console.log(e.target.files)}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            Alege un fișier <span className="font-normal">/ drag-and-drop</span>
          </span>
        </button>
      </div>
    </div>
  );
}
