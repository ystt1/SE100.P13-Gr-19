import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import QuizListItem from "../Quiz/QuizListItem";
import QuizSetService from "../../data/service/quiz_set_service";
import { format } from "date-fns";
import OldQuizModal from "./components/quiz_add_modal";
import { useSnackbar } from "../../components/NotificationBat";
import QuizService from "../../data/service/quiz_service";
import NewQuizModal from "../Quiz/AddQuizModal";

const QuizsetDetail = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const [showAddOldModal, setShowAddOldModal] = useState(false);
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [quizsetQuizzes, setQuizsetQuizzes] = useState([]);
  const [quizsetDetail, setQuizsetDetail] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchQuizSetDetail = async () => {
    try {
      const responseDetail = await QuizSetService.getQuizSetDetail(id);
      setQuizsetDetail(responseDetail.data);
      const responseQuizzes = await QuizSetService.getQuizOfQuizSet(id);
      setQuizsetQuizzes(responseQuizzes.data.quizzes || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuizSetDetail();
  }, [id]);

  const handleAddQuiz = async (quizzed) => {
    var quizId = quizzed.map((e) => e.id);
    var response = await QuizSetService.addQuizToQuizSet(quizId, id);
    if (response.status == 200) {
      showSnackbar(response.data)
      setShowAddOldModal(false)
      fetchQuizSetDetail()
    }
    else {
      alert(response);
    }
  };

  
  const handleQuizSubmit = async (quizData) => {
    const response = await QuizService.addQuiz(quizData);
 
    if(response.status===200)
    {
      const newResponse=await QuizSetService.addQuizToQuizSet([response.data.id],id)
  
      
      if(newResponse.status===200)
      {
        showSnackbar(newResponse.data)
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        {quizsetDetail ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-2">{quizsetDetail.name}</h2>
            <p className="text-gray-700 mb-4">{quizsetDetail.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <p>
                  Date:{" "}
                  {format(new Date(quizsetDetail.createdTime), "MMMM d, yyyy h:mm:ss a")}
                </p>
                <p>Time Limit: {quizsetDetail.timeLimit}</p>
                <p>Attempts: {quizsetDetail.attempts}</p>
                <p>
                  <b>Owner: {quizsetDetail.creator.name}</b>
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Start Quiz
              </button>
            </div>
          </div>
        ) : (
          <div>Loading quiz set details...</div>
        )}

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
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg"
          >
            Add Quiz
          </button>
          {dropdownOpen && (
            <div className="absolute bottom-16 right-0 bg-white border rounded-lg shadow-md w-48">
              <button
                onClick={() => setShowAddOldModal(true)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                OLD QUIZ
              </button>
              <button
                onClick={() => setShowAddNewModal(true)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                NEW QUIZ
              </button>
            </div>
          )}
        </div>

        <OldQuizModal
          show={showAddOldModal}
          onClose={() => setShowAddOldModal(false)}
          onAddQuiz={handleAddQuiz}
          quizsetQuizzes={quizsetQuizzes}
        />
        {showAddNewModal && (
          <NewQuizModal
          show={showAddNewModal}
            onClose={() => setShowAddNewModal(false)}
            onSuccess={fetchQuizSetDetail}
            onSubmit={handleQuizSubmit} 
          />
        )}
      </div>
    </div>
  );
};

export default QuizsetDetail;
