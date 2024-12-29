import React, { useState } from "react";
import QuizSetCard from "./commponent/quiz_set_card";
import QuizSetSection from "./commponent/quiz_set_section";
import SideBar from "../../components/Sidebar";

const mockQuizData = {
  recent: [
    { title: "QuizSet 1", owner: "Owner 1", questions: 10, minutes: 30, createdAt: "1 day ago", participants: 500, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 2", owner: "Owner 2", questions: 15, minutes: 45, createdAt: "2 days ago", participants: 300, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 3", owner: "Owner 3", questions: 20, minutes: 60, createdAt: "3 days ago", participants: 200, imageUrl: "public\\quiz_set_background.jpg" },
  ],
  recommendQuizSet: [
    { title: "QuizSet 4", owner: "Owner 4", questions: 25, minutes: 90, createdAt: "4 days ago", participants: 800, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 5", owner: "Owner 5", questions: 12, minutes: 20, createdAt: "5 days ago", participants: 600, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 6", owner: "Owner 6", questions: 8, minutes: 15, createdAt: "6 days ago", participants: 700, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 7", owner: "Owner 7", questions: 18, minutes: 40, createdAt: "7 days ago", participants: 900, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 8", owner: "Owner 8", questions: 22, minutes: 60, createdAt: "8 days ago", participants: 400, imageUrl: "public\\quiz_set_background.jpg" },
  ],
  recommendTopic: [
    { title: "QuizSet 9", owner: "Owner 9", questions: 15, minutes: 30, createdAt: "9 days ago", participants: 300, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 10", owner: "Owner 10", questions: 20, minutes: 40, createdAt: "10 days ago", participants: 800, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 11", owner: "Owner 11", questions: 25, minutes: 90, createdAt: "11 days ago", participants: 1000, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 12", owner: "Owner 12", questions: 10, minutes: 20, createdAt: "12 days ago", participants: 500, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 13", owner: "Owner 13", questions: 18, minutes: 35, createdAt: "13 days ago", participants: 600, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 14", owner: "Owner 14", questions: 30, minutes: 60, createdAt: "14 days ago", participants: 900, imageUrl: "public\\quiz_set_background.jpg" },
  ],
  random: [
    { title: "QuizSet 15", owner: "Owner 15", questions: 15, minutes: 30, createdAt: "15 days ago", participants: 300, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 16", owner: "Owner 16", questions: 20, minutes: 40, createdAt: "16 days ago", participants: 800, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 17", owner: "Owner 17", questions: 25, minutes: 90, createdAt: "17 days ago", participants: 1000, imageUrl: "public\\quiz_set_background.jpg" },
    { title: "QuizSet 18", owner: "Owner 18", questions: 10, minutes: 20, createdAt: "18 days ago", participants: 500, imageUrl: "public\\quiz_set_background.jpg" },
  ],
};

const ITEMS_PER_VIEW = 3;

const DashboardPage = () => {
  const [startIndexes, setStartIndexes] = useState({
    recent: 0,
    recommendQuizSet: 0,
    recommendTopic: 0,
    random: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNext = (category, length) => {
    if (startIndexes[category] + ITEMS_PER_VIEW < length) {
      setStartIndexes((prev) => ({ ...prev, [category]: prev[category] + 1 }));
    }
  };

  const handlePrev = (category) => {
    if (startIndexes[category] > 0) {
      setStartIndexes((prev) => ({ ...prev, [category]: prev[category] - 1 }));
    }
  };

  const renderQuizSets = (category) => {
    const data = mockQuizData[category];
    const startIndex = startIndexes[category];
    const visibleQuizSets = data.slice(startIndex, startIndex + ITEMS_PER_VIEW);

    return (
      <div className="flex items-center justify-between">
        <button
          onClick={() => handlePrev(category)}
          disabled={startIndex === 0}
          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full shadow-md ${startIndex === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:scale-110 transition-transform"
            }`}
        >
          &lt;
        </button>
        <div className="flex flex-grow justify-center gap-4 px-4">
          {visibleQuizSets.map((quiz, index) => (
            <QuizSetCard key={index} {...quiz} />
          ))}
        </div>
        <button
          onClick={() => handleNext(category, data.length)}
          disabled={startIndex + ITEMS_PER_VIEW >= data.length}
          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full shadow-md ${startIndex + ITEMS_PER_VIEW >= data.length
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:scale-110 transition-transform"
            }`}
        >
          &gt;
        </button>
      </div>
    );
  };


  return (
    <div className="flex bg-gray-50 min-h-screen">
  {/* Sidebar */}
  <SideBar className="fixed w-64 bg-white shadow-md" />

  {/* Main Content */}
  <div className="flex-grow ml-64 px-6 py-4">
    {/* Search Bar */}
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search for quiz sets..."
        className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>

    {/* Quiz Sections */}
    <div className="space-y-6">
      <QuizSetSection title="Recent">{renderQuizSets("recent")}</QuizSetSection>
      <QuizSetSection title="Recommend QuizSet">{renderQuizSets("recommendQuizSet")}</QuizSetSection>
      <QuizSetSection title="Recommend Topic">{renderQuizSets("recommendTopic")}</QuizSetSection>
      <QuizSetSection title="Random">{renderQuizSets("random")}</QuizSetSection>
    </div>
  </div>
</div>

  );


};

export default DashboardPage;

