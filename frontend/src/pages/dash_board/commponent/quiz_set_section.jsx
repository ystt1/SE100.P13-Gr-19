import * as React from "react";
export default function QuizSetSection({ title, icon, children }) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
        <span>{icon}</span> {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </section>
  );
}