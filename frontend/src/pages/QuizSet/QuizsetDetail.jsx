import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import AddQuizModal from "../Quiz/AddQuizModal";
import QuizListItem from "../Quiz/QuizListItem";
import { useParams } from "react-router-dom";
import QuizSetService from "../../data/service/quiz_set_service";
import { format } from "date-fns";


const QuizsetDetail = () => {
  const { id } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [quizsetQuizzes, setQuizsetQuizzes] = useState([]);
  const [quizsetDetail, setQuizsetDetail] = useState(null);
  const fetchQuizSetDetail = async () => {
    try {

      const responseDetail = await QuizSetService.getQuizSetDetail(id);
      setQuizsetDetail(responseDetail.data);
      const responseQuizzes = await QuizSetService.getQuizOfQuizSet(id);
      setQuizsetQuizzes(responseQuizzes.data.quizzes || []);
    } catch (err) {
    } finally {

    }
  };

  useEffect(() => {
    fetchQuizSetDetail();
  }, [id]);

  const handleAddQuiz = (quiz) => {
    // Check
    if (!quizsetQuizzes.some((q) => q.id === quiz.id)) {
      setQuizsetQuizzes([...quizsetQuizzes, quiz]);
    } else {
      alert("This question is already added to the quiz set!");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50">


        {/* Quizset Information */}
        {quizsetDetail ? (<div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">{quizsetDetail.name}</h2>
          <p className="text-gray-700 mb-4">{quizsetDetail.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              <p>Date: {format(new Date(quizsetDetail.createdTime), "MMMM d, yyyy h:mm:ss a")}</p>
              <p>Time Limit: {quizsetDetail.timeLimit}</p>
              <p>Attempts: {quizsetDetail.attempts}</p>
              <p><b>Owner: {quizsetDetail.creator.name}</b></p> {/* Hiển thị owner */}
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Start Quiz
            </button>
          </div>
        </div>) : (
          <div>Loading quiz set details...</div>
        )}

        {/* Quiz List */}
        <div className="mt-6 space-y-4">
          {quizsetQuizzes.map((quiz) => (
            <QuizListItem
              key={quiz.id}
              content={quiz.content}
              type={quiz.type}
              createdAt={format(new Date(quiz.createdAt), "MMMM d, yyyy h:mm:ss a")}
              topic={quiz.topic.name}

            />
          ))}
        </div>


        {/* Add Quiz Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-6 right-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg"
        >
          Add Quiz
        </button>
        {/* Add Quiz Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Add Quiz to Quizset</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-red-500 text-lg font-bold"
                >
                  ✖
                </button>
              </div>
              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button
                  className={`flex-1 text-center py-2 ${activeTab === 0
                      ? "border-b-2 border-blue-600 font-bold"
                      : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab(0)}
                >
                  From Quiz Library
                </button>
                <button
                  className={`flex-1 text-center py-2 ${activeTab === 1
                      ? "border-b-2 border-blue-600 font-bold"
                      : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab(1)}
                >
                  New Question
                </button>
              </div>


              {activeTab === 0 && (
                <div>

                  <div className="flex items-center mb-4">
                    <SearchBar
                      placeholder="Search Quiz"
                      value={searchQuery}

                    />
                    <select
                      className="ml-4 px-4 py-2 border rounded-lg"
                      value={sortOption}

                    >
                      <option value="name">Sort by Name</option>
                      <option value="type">Sort by Type</option>
                      <option value="createdDate">Sort by Created Date</option>
                    </select>
                  </div>

                  {/* Quiz Library List */}
                  {quizsetQuizzes
                    .map((quiz) => (
                      <QuizListItem
                        key={quiz.id}
                        question={quiz}
                        onAction={handleAddQuiz}
                        actionType="add"
                      />
                    ))}
                </div>
              )}
              {/* New Question */}
              {activeTab === 1 && (
                <AddQuizModal
                  onClose={() => {
                    setActiveTab(0); // Back "From Quiz Library"
                  }}
                  onSubmit={(newQuiz) => handleAddQuiz(newQuiz)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizsetDetail;
