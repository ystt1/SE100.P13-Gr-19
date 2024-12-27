import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const QuizListItem = ({ question, onDelete }) => {
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
        onClick={() => onDelete(question.id)}
        className="text-red-500 hover:text-red-700"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default QuizListItem;
