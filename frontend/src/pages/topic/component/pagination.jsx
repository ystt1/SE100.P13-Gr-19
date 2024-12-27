import * as React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const [inputValue, setInputValue] = React.useState(currentPage);

  // Handle input changes
  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setInputValue(Number(value));
    } else if (value === "") {
      setInputValue("");
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    if (inputValue === "" || inputValue < 1 || inputValue > totalPages) {
      setInputValue(currentPage);
    } else {
      onPageChange(inputValue);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-3 mt-6 text-lg font-medium text-gray-600 border-t border-gray-200">
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(1)}
        className="px-3 py-1 text-gray-500 hover:text-blue-600 disabled:opacity-50"
        aria-label="First page"
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 text-gray-500 hover:text-blue-600 disabled:opacity-50"
        aria-label="Previous page"
        disabled={currentPage === 1}
      >
        &lsaquo;
      </button>

      {/* Current Page Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-14 text-center text-blue-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <span>/ {totalPages}</span>
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 text-gray-500 hover:text-blue-600 disabled:opacity-50"
        aria-label="Next page"
        disabled={currentPage === totalPages}
      >
        &rsaquo;
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => onPageChange(totalPages)}
        className="px-3 py-1 text-gray-500 hover:text-blue-600 disabled:opacity-50"
        aria-label="Last page"
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
}
