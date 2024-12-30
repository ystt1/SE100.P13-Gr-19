import React, { useState } from "react";
import { QuizSetCard } from "./QuizSetCard";
import TabNavigation from "../../components/TabNavigation";
import AddQuizSetModal from "./AddQuizSetModal";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import avatar from "../../images/avatar.png";


const quizSets = [
  {
    id: 1,
    name: "Quizset 1",
    description: "Math Quiz covering basic arithmetic and algebra.",
    createdDate: "2024-12-01",
    questionCount: 10,
    topic: "Math",
    isSaved: true, 
  },
  {
    id: 2,
    name: "Quizset 2",
    description: "Science Quiz with biology and chemistry basics.",
    createdDate: "2024-11-25",
    questionCount: 8,
    topic: "Science",
    isSaved: false,
  },
  {
    id: 3,
    name: "Quizset A",
    description: "Advanced programming quiz.",
    createdDate: "2024-11-15",
    questionCount: 12,
    topic: "Programming",
    isSaved: false, 
  },
];

const QuizSetPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("name"); 
  const [quizSetData, setQuizSetData] = useState(quizSets); //get quizset

  const handleQuizSetClick = (id) => {
    navigate(`/quizset-detail/${id}`);
  };

  

  // Lọc danh sách quiz set theo tab
  const filteredQuizSets = quizSetData.filter((quizSet) =>
    activeTab === 0
      ? quizSet.name.toLowerCase().includes(searchQuery.toLowerCase())
      : quizSet.isSaved // Hiển thị saved khi ở tab "Save Quizset"
  );

  const sortQuizSets = (quizSets, option) => {
    return [...quizSets].sort((a, b) => {
      if (option === "name") {
        return a.name.localeCompare(b.name);
      }
      if (option === "createdDate") {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
      if (option === "questionCount") {
        return b.questionCount - a.questionCount;
      }
      return 0;
    });
  };

  const sortedQuizSets = sortQuizSets(filteredQuizSets, sortOption);

  
  const [quizSetsState, setQuizSetsState] = useState(quizSets);

  const toggleSaveStatus = (id) => {
    const updatedQuizSets = quizSetsState.map((quizSet) =>
      quizSet.id === id ? { ...quizSet, isSaved: !quizSet.isSaved } : quizSet
    );
    setQuizSetsState(updatedQuizSets); 
  };

  const handleAddQuizSet = (newQuizSet) => {
    console.log("New Quiz Set:", newQuizSet);  
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

        {/* Tabs và Sort */}
        <div className="flex justify-between items-center mt-6 mb-6">
          <TabNavigation
            tabs={["Your Quiz Set", "Save Quizset"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex items-center space-x-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="name">Sort by Name</option>
                <option value="createdDate">Sort by Created Date</option>
                <option value="questionCount">Sort by Question Count</option>
              </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Quiz Set
            </button>
          </div>
        </div>

        {/* Quiz Sets */}
        <div>
          {sortedQuizSets.map((quizSet) => (
            <QuizSetCard
              key={quizSet.id}
              name={quizSet.name}
              description={quizSet.description}
              questionCount={quizSet.questionCount}
              topic={quizSet.topic}
              createdDate={quizSet.createdDate}
              isSaved={quizSet.isSaved} 
              onClick={() => handleQuizSetClick(quizSet.id)}
              onToggleSave={() => toggleSaveStatus(quizSet.id)} 
            />
          ))}
        </div>



        {/* Modal */}
        {showAddModal && (
          <AddQuizSetModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddQuizSet}
          />
        )}
      </div>
    </div>
  );
};

export default QuizSetPage;
