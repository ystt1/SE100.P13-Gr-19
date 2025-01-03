import React from "react";
import Question from "./Question";

const QuestionList = ({ quizData, userAnswers, handleAnswerChange }) => (
  <div>
    {quizData.map((question, index) => (
      <Question
        key={question.id}
        question={question}
        questionIndex={index}
        userAnswers={userAnswers}
        handleAnswerChange={handleAnswerChange}
      />
    ))}
  </div>
);

export default QuestionList;
