import React from "react";
import { QuizSetCard } from "./QuizsetCard";
import { DateDivider } from "./DateDivider";

const quizSets = [
  {
    date: "Today",
    items: [
      { headline: "Quizset name", supportingText: "Description", label: "Label" },
    ],
  },
  {
    date: "19 / 7 / 2022",
    items: [
      { headline: "Headline", supportingText: "Supporting Text", label: "Label" },
      { headline: "Headline", supportingText: "Supporting Text", label: "Label" },
    ],
  },
];

const QuizSetDashboard = () => {
  return (
    <div className="flex flex-col px-6 py-8 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold">Your Quiz Sets</div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
            Recent
          </button>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-lg"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Add Quiz Set
          </button>
        </div>
      </div>

      {/* Quiz Sets */}
      {quizSets.map((section, index) => (
        <div key={index} className="mb-8">
          <DateDivider date={section.date} />
          {section.items.map((item, itemIndex) => (
            <QuizSetCard
              key={itemIndex}
              headline={item.headline}
              supportingText={item.supportingText}
              label={item.label}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuizSetDashboard;
