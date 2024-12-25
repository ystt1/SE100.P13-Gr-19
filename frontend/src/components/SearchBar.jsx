import * as React from "react";

function SearchBar() {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-md shadow-md">
      <input
        type="text"
        placeholder="Search Quiz"
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button className="px-4 py-2 text-white bg-blue-600 rounded-lg">Search</button>
    </div>
  );
}

export default SearchBar;
