import React from 'react';

const Model = ({ handleConfirmDelete, setShowModal, errorTitle , Yes , No}) => {
  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="relative p-6 w-full max-w-md max-h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2 transition-all duration-200 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setShowModal(false)}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-red-500 w-14 h-14 dark:text-red-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
            {errorTitle}
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirmDelete}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200"
            >
              {Yes}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-6 py-3  hover:text-gray-200 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              {No}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
