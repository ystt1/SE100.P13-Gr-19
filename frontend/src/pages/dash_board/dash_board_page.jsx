import React, { useState, useEffect } from "react";
import QuizSetCard from "./commponent/quiz_set_card";
import QuizSetSection from "./commponent/quiz_set_section";
import SideBar from "../../components/Sidebar";
import QuizSetService from "../../data/service/quiz_set_service";

const ITEMS_PER_VIEW = 5;

const DashboardPage = () => {
  const [quizData, setQuizData] = useState({
    recent: [],
    recommendQuizSet: [],
    recommendTopic: [],
    random: [],
  });

  const [startIndexes, setStartIndexes] = useState({
    recent: 0,
    recommendQuizSet: 0,
    recommendTopic: 0,
    random: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await QuizSetService.getRandom()


        const formattedData = {
          recent: response.quizSets,
          recommendQuizSet: response.quizSets,
          recommendTopic: response.quizSets,
          random: response.quizSets,
        };

        setQuizData(formattedData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []);

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
    const data = quizData[category];
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
            <QuizSetCard key={index} title={quiz.name} owner={quiz.creator.name} questions={quiz.totalQuestion} createdAt={quiz.createdTime} id={quiz.id} />
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
            value={searchQuery}
            onChange={handleSearchChange}
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
