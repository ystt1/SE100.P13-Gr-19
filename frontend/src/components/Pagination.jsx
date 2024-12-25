import * as React from "react";

function Pagination() {
  return (
    <div className="flex justify-between items-center mt-6">
      <button className="px-4 py-2 bg-gray-200 rounded-lg">&lt; Prev</button>
      <button className="px-4 py-2 bg-gray-200 rounded-lg">Next &gt;</button>
    </div>
  );
}

export default Pagination;
