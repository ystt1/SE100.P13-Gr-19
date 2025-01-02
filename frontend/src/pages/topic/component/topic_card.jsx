  import React, { useState } from "react";
 

  export default function TopicCard({ id, name, description, usageCount, owner, onEdit, onDelete,onClick }) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
   

    return (
      <div
        className="flex flex-col p-3 rounded-lg shadow-md border border-gray-200 bg-white text-gray-700 w-56 relative cursor-pointer"
        onClick={()=>{
          onClick(id)
        }}
      >
        {/* Main Content */}
        <div className="text-lg font-semibold text-center text-blue-700">{name}</div>
        <div className="mt-3 text-sm text-gray-600 line-clamp-3">{description}</div>
        <div className="mt-3 text-xs font-medium">Used: {usageCount} times</div>
        <div className="mt-1 text-xs text-gray-500">Owner: {owner}</div>

        {/* Menu Button */}
        <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation() /* Ngăn chặn sự kiện click truyền lên card */}>
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
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click trên menu
                setMenuOpen(false); // Close the dropdown
                onEdit({ id, name, description }); // Pass topic details to parent for editing
              }}
            >
              Edit
            </button>
            <button
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click trên menu
                setMenuOpen(false); // Close the dropdown
                setConfirmOpen(true); // Open confirmation modal
              }}
            >
              Delete
            </button>
          </div>
        )}
        {isConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <p className="text-gray-700 text-lg mb-4">Are you sure you want to delete this topic?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn sự kiện click trên modal
                    setConfirmOpen(false); // Close modal
                    onDelete(id); // Trigger delete logic
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                >
                  Yes
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn sự kiện click trên modal
                    setConfirmOpen(false); // Close modal
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
