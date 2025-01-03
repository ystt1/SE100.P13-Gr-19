import React from "react";
import AnswerOptions from "./AnswerOptions";

const Question = ({ question, questionIndex, userAnswers, handleAnswerChange }) => {
  const { id, content, type, options, blanks } = question;

  return (
    <div className="mb-6 border-b pb-4">
      <h3 className="text-lg font-bold mb-2">{`Question ${questionIndex + 1}: ${content}`}</h3>
      <AnswerOptions
        id={id}
        type={type}
        options={options}
        blanks={blanks}
        userAnswers={userAnswers}
        handleAnswerChange={handleAnswerChange}
      />
    </div>
  );
};

export default Question;
