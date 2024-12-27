import React from "react";

export const DateDivider = ({ date }) => {
  return (
    <div className="flex items-center mb-4">
      <span className="text-lg font-semibold">{date}</span>
      <hr className="flex-grow mx-4 border-gray-300" />
    </div>
  );
};
