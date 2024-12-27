import React from 'react';

const QuizCard = ({ question, type, answer, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="font-bold text-lg">{question}</h3>
      <p className="text-sm text-gray-600">Type: {type}</p>
      <p className="text-sm text-gray-600">Answer: {answer}</p>
      <button
        onClick={onDelete}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Delete
      </button>
    </div>
  );
};

export default QuizCard;
