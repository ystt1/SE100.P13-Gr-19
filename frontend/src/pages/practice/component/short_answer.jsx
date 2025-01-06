import React from "react";

const ShortAnswer = ({ question, userAnswer, onChange }) => {
  return (
    <input
      type="text"
      className="w-full border rounded p-2"
      value={userAnswer || ""}
      onChange={(e) => onChange(e.target.value, question.id, question.type)}
    />
  );
};

export default ShortAnswer;
