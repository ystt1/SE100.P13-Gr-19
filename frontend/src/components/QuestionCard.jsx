import * as React from "react";

function QuestionCard({ question }) {
  if (question.isTextInput) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">
          Question {question.number}: {question.question}
        </h3>
        <p className="mt-2 text-sm text-gray-600">Answer: {question.answer}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">
        Question {question.number}: {question.question}
      </h3>
      <p className="mt-2 text-sm text-gray-600">Topic: {question.topic}</p>
      {question.answers.map((answer, index) => (
        <div
          key={index}
          className={`p-2 mt-2 rounded-lg ${
            answer.isCorrect ? "bg-green-200" : "bg-gray-200"
          }`}
        >
          {answer.text}
        </div>
      ))}
    </div>
  );
}

export default QuestionCard;
