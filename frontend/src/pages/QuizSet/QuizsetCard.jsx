import React from "react";

export const QuizSetCard = ({ headline, supportingText, label, onClick }) => {
  return (
    <div
      className="cursor-pointer flex relative flex-col w-full bg-white border border-black border-solid min-h-[84px] shadow-md"
      onClick={onClick}
    >
      <div className="flex flex-wrap gap-3 items-center py-3 pr-5 pl-4">
        <div className="flex-1">
          <div className="text-base font-medium">{headline}</div>
          <div className="text-sm text-gray-600">{supportingText}</div>
        </div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
};

