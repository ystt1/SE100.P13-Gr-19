import React from "react";
import { FaBookmark, FaRegBookmark, FaTrashAlt, FaUser } from "react-icons/fa";

export const QuizSetCard = ({
  name,
  description,
  questionCount,
  topic,
  createdTime,
  creator,
  isSaved,
  onClick,
  onToggleSave,
  onDelete,
  isYour,
}) => {
  const truncatedDescription =
    description && description.length > 50
      ? `${description.substring(0, 50)}...`
      : description || "No description available";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white flex justify-between items-center"
    >
      {/* Nội dung bên trái */}
      <div>
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{truncatedDescription}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span className="flex items-center space-x-1">
            <span className="text-blue-600 font-semibold">{topic}</span>
          </span>
          <span>•</span>
          <span>Created: {createdTime}</span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <FaUser size={14} className="text-gray-500" />
            <span>{creator || "Unknown"}</span>
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Questions: {questionCount}</p>
      </div>

      {/* Nút thao tác bên phải */}
      {isYour==true &&<div className="flex items-center space-x-4">
        {/* Nút Save */}
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onToggleSave();
          }}
          className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
        >
          {isSaved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
          <span>{isSaved ? "Saved" : "Save"}</span>
        </button>

        {/* Nút Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete();
          }}
          className="text-red-500 hover:text-red-700 flex items-center space-x-2"
        >
          <FaTrashAlt size={20} />
          <span>Delete</span>
        </button>
      </div>}
    </div>
  );
};
