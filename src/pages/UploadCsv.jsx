import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

export default function UploadCsv() {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Manually manage loading state

  const uploadFileMutation = useMutation({
    mutationFn: async (file) => {
      setIsLoading(true); // Set loading true when mutation starts
      const formData = new FormData();
      formData.append('csvFile', file);

      const response = await fetch('http://62.121.70.17:7893/upload-csv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setIsLoading(false); // Ensure to stop loading if there's an error
        throw new Error(`Failed to upload file. Status: ${response.status}`);
      }
      setIsLoading(false); // Reset loading state on success
      return response.json();
    },
    onError: () => {
      setIsLoading(false); // Ensure to stop loading on error
    },
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (files) => {
    if (files && files.length > 0) {
      uploadFileMutation.mutate(files[0]);
    }
  };

  return (
    <div className="absolute h-full w-full grid place-items-center">
      <div className="bg-white rounded-xl p-8 border shadow-lg flex flex-col max-w-2xl w-full">
        <div className="flex justify-between">
          <h2 className="text-xl text-yellow-600 font-bold mb-4">
            Upload a CSV File
          </h2>
          <span className="text-gray-500">max 128MB</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          name="csvFile"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
          Select a file or drag it here
        </button>
        {isLoading && (
          <p className="text-blue-500 text-center mt-2">Uploading...</p>
        )}
        {uploadFileMutation.isError && (
          <p className="text-red-500 text-center mt-2">
            Error during upload: {uploadFileMutation.error.message}
          </p>
        )}
        {uploadFileMutation.isSuccess && (
          <p className="text-green-500 text-center mt-2">
            File has been successfully uploaded!
          </p>
        )}
      </div>
    </div>
  );
}
