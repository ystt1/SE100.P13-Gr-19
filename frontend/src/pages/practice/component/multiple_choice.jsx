import React from "react";

const MultipleChoice = ({ question, userAnswer, onChange }) => {
  return question.options.map((option, idx) => (
    <div key={idx} className="mb-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name={`question-${question.id}`}
          value={option.content}
          checked={Array.isArray(userAnswer) && userAnswer.includes(option.content)}
          onChange={() => onChange(option.content, question.id, question.type)}
        />
        {option.content}
      </label>
    </div>
  ));
};

export default MultipleChoice;
