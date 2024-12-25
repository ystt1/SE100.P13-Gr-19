import React from "react";

export const QuizSetCard = ({ headline, supportingText, label }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm mb-4">
      <div>
        <h3 className="text-lg font-semibold">{headline}</h3>
        <p className="text-sm text-gray-600">{supportingText}</p>
      </div>
      <span className="text-sm text-blue-600">{label}</span>
    </div>
  );
};
