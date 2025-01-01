import React from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { format } from "date-fns";

const QuizListItem = ({ question, content,createdAt,type,topic,onDelete }) => {
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
        onClick={onDelete}
        className="text-white px-3 py-2 rounded-lg bg-red-500 hover:bg-red-700"
       
      >
        <FaTrashAlt /> 
      </button>
    </div>
  );
};

export default QuizListItem;
