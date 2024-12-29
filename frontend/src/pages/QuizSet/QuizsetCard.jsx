import React from "react";

export const QuizSetCard = ({ name, description, questionCount, topic, createdDate, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border p-4 rounded-lg shadow-md hover:bg-gray-100"
    >
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600 mb-2">
        {description.length > 50
          ? `${description.substring(0, 50)}...`
          : description}
        <span className="ml-4 text-sm text-blue-600">{topic}</span>
        <span className="ml-4 text-sm text-gray-500">Created: {createdDate}</span>
      </p>
      <p className="text-sm text-gray-500">Questions: {questionCount}</p>
    </div>
  );
};



