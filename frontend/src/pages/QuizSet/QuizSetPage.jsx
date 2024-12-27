import React, { useState } from "react";
import { QuizSetCard } from "./QuizSetCard";
import { DateDivider } from "./DateDivider";
import TabNavigation from "../../components/TabNavigation";
import AddQuizSetModal from "./AddQuizSetModal";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import avatar from "../../images/avatar.png";

const quizSets = [
  {
    date: "Today",
    items: [{ headline: "Quizset 1", supportingText: "Math", label: "Label", id: 1 }],
  },
  {
    date: "19/7/2022",
    items: [{ headline: "Quizset 2", supportingText: "Science", label: "Label", id: 2 }],
  },
];

const QuizSetPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleQuizSetClick = (id) => {
    navigate(`/quizset-detail/${id}`);
  };

  const filteredQuizSets = quizSets.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.headline.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const handleAddQuizSet = (newQuizSet) => {
    console.log("New Quiz Set:", newQuizSet);
    // Xử lý thêm quiz set vào danh sách
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">QuizSet</h1>
          <div className="flex items-center space-x-4">
            <div className="text-xl">Trung Huynh</div>
            <img
              src={avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search QuizSet"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Tabs */}
        <div className="flex justify-between items-center mt-6 mb-6">
          <TabNavigation
            tabs={["Your Quiz Set", "Save Quizset"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add Quiz Set
          </button>
        </div>

        {/* Quiz Sets */}
        {filteredQuizSets.map((section, index) => (
          <div key={index} className="mb-6">
            <DateDivider date={section.date} />
            {section.items.map((item, i) => (
              <QuizSetCard
                key={i}
                {...item}
                onClick={() => handleQuizSetClick(item.id)}
              />
            ))}
          </div>
        ))}

        {showAddModal && 
              <AddQuizSetModal
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddQuizSet}
              />
        }
      </div>
    </div>
  );
};

export default QuizSetPage;
