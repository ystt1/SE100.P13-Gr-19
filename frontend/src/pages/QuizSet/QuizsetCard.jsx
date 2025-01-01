import React from "react";
import { FaBookmark, FaRegBookmark, FaTrashAlt } from "react-icons/fa";

export const QuizSetCard = ({
  name,
  description,
  questionCount,
  topic,
  createdTime,
  isSaved,
  onClick,
  onToggleSave,
  onDelete, // Hàm xử lý xóa
}) => {
  const truncatedDescription =
    description && description.length > 50
      ? `${description.substring(0, 50)}...`
      : description || "No description available";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer border p-4 rounded-lg shadow-md hover:bg-gray-100 flex justify-between items-center"
    >
      {/* Nội dung bên trái */}
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600 mb-2">
          {truncatedDescription}
          <span className="ml-4 text-sm text-blue-600">{topic}</span>
          <span className="ml-4 text-sm text-gray-500">Created: {createdTime}</span>
        </p>
        <p className="text-sm text-gray-500">Questions: {questionCount}</p>
      </div>

      {/* Nút thao tác bên phải */}
      <div className="flex items-center space-x-4">
        {/* Nút Save */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Ngăn việc kích hoạt sự kiện click toàn bộ card
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
            e.stopPropagation(); // Ngăn việc kích hoạt sự kiện click toàn bộ card
            onDelete();
          }}
          className="text-red-500 hover:text-red-700 flex items-center space-x-2"
        >
          <FaTrashAlt size={20} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
