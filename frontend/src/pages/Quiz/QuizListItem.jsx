import React from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

const QuizListItem = ({ question, onAction, actionType }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg shadow-sm hover:shadow-md">
      <div>
        <p className="font-semibold">Question: {question.content}</p>
        <p className="text-sm text-gray-600">
          <span className="mr-20">Created Date: {question.createdDate}</span>
          <span className="mr-20">Type: {question.type}</span>
          <span>Topic: {question.topic}</span>
        </p>
      </div>
      <button
        onClick={() => onAction(question.id)}
        className={`text-white px-3 py-2 rounded-lg ${
          actionType === "delete" ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {actionType === "delete" ? <FaTrashAlt /> : <FaPlus />}
      </button>
    </div>
  );
};

export default QuizListItem;
