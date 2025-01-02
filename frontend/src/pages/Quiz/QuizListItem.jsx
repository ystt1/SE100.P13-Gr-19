import React from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

const QuizListItem = ({ content, createdAt, type, topic, onAction, actionType }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg shadow-sm hover:shadow-md">
      <div>
        <p className="font-semibold">Question: {content}</p>
        <p className="text-sm text-gray-600">
          <span className="mr-20">Created Date: {createdAt}</span>
          <span className="mr-20">Type: {type}</span>
          <span>Topic: {topic}</span>
        </p>
      </div>
      <button
        onClick={onAction}
        className={`text-white px-3 py-2 rounded-lg ${
          actionType === "add" ? "bg-blue-500 hover:bg-blue-700" : "bg-red-500 hover:bg-red-700"
        }`}
      >
        {actionType === "add" ? <FaPlus /> : <FaTrashAlt />}
      </button>
    </div>
  );
};

export default QuizListItem;
