import React from "react";

const ShortAnswerInput = ({ correctAnswer, setQuizData }) => {
  return (
    <input
      type="text"
      placeholder="Correct Answer"
      className="w-full mb-3 px-4 py-2 border rounded-lg"
      value={correctAnswer}
      onChange={(e) => setQuizData((prev) => ({ ...prev, correctAnswer: e.target.value }))}
    />
  );
};

export default ShortAnswerInput;
