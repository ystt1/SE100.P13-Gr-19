import * as React from "react";
import { FiSearch, FiX } from "react-icons/fi";

function SearchBar({ value, onChange, onSearch, onClear }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn chặn hành vi mặc định
      onSearch(); // Gọi hàm tìm kiếm
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-md shadow-md">
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search Quiz"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown} // Gắn hàm xử lý phím
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* Search Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onSearch}
      >
        <FiSearch size={20} />
        Search
      </button>
    </div>
  );
}

export default SearchBar;
