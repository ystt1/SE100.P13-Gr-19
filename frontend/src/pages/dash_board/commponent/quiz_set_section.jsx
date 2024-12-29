import * as React from "react";
export default function QuizSetSection({ title, children }) {
  return (
    <div className="flex flex-col w-full">
      {/* Tiêu đề Section */}
      <div className="flex justify-between px-4 py-2 font-bold text-blue-700">
        <div className="text-lg">{title}</div>
      </div>

      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {children}
      </div>
    </div>
  );
}

