import React, { useState } from "react";

export default function TopicCard({ name, description, usageCount, owner, onEdit, onDelete }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col p-3 rounded-lg shadow-md border border-gray-200 bg-white text-gray-700 w-56 relative">
      {/* Main Content */}
      <div className="text-lg font-semibold text-center text-blue-700">{name}</div>
      <div className="mt-3 text-sm text-gray-600 line-clamp-3">{description}</div>
      <div className="mt-3 text-xs font-medium">Used: {usageCount} times</div>
      <div className="mt-1 text-xs text-gray-500">Owner: {owner}</div>

      {/* Menu Button */}
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="text-gray-500 hover:text-gray-800"
        >
          ⋮
        </button>
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-8 right-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              setMenuOpen(false); // Close the dropdown
              onEdit({ name, description }); // Pass topic details to parent for editing
            }}
          >
            Edit
          </button>
          <button
            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              setMenuOpen(false); // Close the dropdown
              onDelete(); // Trigger delete logic
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
