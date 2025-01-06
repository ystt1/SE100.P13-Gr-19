import React from "react";

const FillInTheBlank = ({ question, userAnswer, onChange }) => {
  return question.blanks.map((_, idx) => (
    <input
      key={idx}
      type="text"
      className="w-full border rounded p-2 mb-2"
      value={userAnswer?.[idx] || ""}
      onChange={(e) => {
        const updatedBlanks = [...(userAnswer || [])];
        updatedBlanks[idx] = e.target.value;
        onChange(updatedBlanks, question.id, question.type);
      }}
    />
  ));
};

export default FillInTheBlank;
