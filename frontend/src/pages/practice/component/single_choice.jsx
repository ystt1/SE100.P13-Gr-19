import React from "react";

const SingleChoice = ({ question, userAnswer, onChange }) => {
  return question.options.map((option, idx) => (
    <div key={idx} className="mb-2">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name={`question-${question.id}`}
          value={option.content}
          checked={userAnswer === option.content}
          onChange={() => onChange(option.content, question.id, question.type)}
        />
        {option.content}
      </label>
    </div>
  ));
};

export default SingleChoice;
