import React from "react";
import { FaClock } from "react-icons/fa";

const QuizHeader = ({ quizData, userAnswers, timeLeft, formatTime, onCancel, onSubmit }) => (
  <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow mb-6">
    <button
      onClick={onCancel}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Cancel
    </button>

    <div className="text-center">
      <h2 className="text-lg font-bold text-blue-800 mb-1">This is just a title of Quiz</h2>
      <div className="text-sm text-gray-600">
        {`Answered: ${Object.keys(userAnswers).length} / ${quizData.length}`}
      </div>
      <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
        <FaClock className="text-blue-800" />
        {`Time Left: ${formatTime(timeLeft)}`}
      </div>
    </div>

    <button
      onClick={onSubmit}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
    >
      Submit
    </button>
  </div>
);

export default QuizHeader;
