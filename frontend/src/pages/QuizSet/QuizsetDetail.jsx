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

import QuizStartPage from "../practice/practice";
const QuizsetDetail = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const [showAddOldModal, setShowAddOldModal] = useState(false);
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [quizsetQuizzes, setQuizsetQuizzes] = useState([]);
  const [quizsetDetail, setQuizsetDetail] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    description: false,
    timeLimit: false,
  });
  const [editedFields, setEditedFields] = useState({
    name: "",
    description: "",
    timeLimit: "",
  });

  const handleRemoveQuizFromQuizSet=async (quiz)=>
  {
    try{
    var response=await QuizSetService.removeQuizFromQuizSet(id,quiz.id);
      
      if(response.status===200)
      {
        showSnackbar(response.data)
        fetchQuizSetDetail()
      }
      else{
        alert(response)
      }
    }
    catch (e){
      throw e;
    }
  }

  const handleEditField = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setEditedFields({
      name: quizsetDetail.name,
      description: quizsetDetail.description,
      timeLimit: quizsetDetail.timeLimit,
      allowShowAnswer: quizsetDetail.allowShowAnswer,
    });
  };

  const handleSaveField = async (field) => {
    try {
      const updatedData = {
        ...quizsetDetail,
        [field]: editedFields[field],
      };
  
      const response = await QuizSetService.updateQuizSet(id, updatedData);
      if (response.status === 200) {
        showSnackbar("Quiz set updated successfully");
        setQuizsetDetail(updatedData);
        localStorage.setItem("quizsetDetail", JSON.stringify(updatedData));
        setIsEditing((prev) => ({ ...prev, [field]: false }));
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to update quiz set");
    }
  };
  

  const handleChangeField = (field, value) => {
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };

  const fetchQuizSetDetail = async () => {
    try {
      const responseDetail = await QuizSetService.getQuizSetDetail(id);
      setQuizsetDetail(responseDetail.data);
      localStorage.setItem("quizsetDetail", JSON.stringify(responseDetail.data));
  
      const responseQuizzes = await QuizSetService.getQuizOfQuizSet(id);
      setQuizsetQuizzes(responseQuizzes.data.quizzes || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAllowShowAnswer=async (quizsetData)=>
  {
    setShowQuiz(true);
    // navigate(`/dashboard/quiz/attempt/${id}`);
  }

  useEffect(() => {
    const storedQuizSetDetail = localStorage.getItem("quizsetDetail");
  const storedShowQuiz = localStorage.getItem("showQuiz");

  if (storedQuizSetDetail) {
    setQuizsetDetail(JSON.parse(storedQuizSetDetail));
  } else {
    fetchQuizSetDetail();
  }

  if (storedShowQuiz) {
    setShowQuiz(JSON.parse(storedShowQuiz));
  }
    
    
  }, [id]);

  const handleAddQuiz = async (quizzed) => {
    var quizId = quizzed.map((e) => e.id);
    var response = await QuizSetService.addQuizToQuizSet(quizId, id);
    if (response.status === 200) {
      showSnackbar(response.data);
      setShowAddOldModal(false);
      fetchQuizSetDetail();
    } else {
      alert(response);
    }
  };

  const handleQuizSubmit = async (quizData) => {
    const response = await QuizService.addQuiz(quizData);
    if (response.status === 200) {
      const newResponse = await QuizSetService.addQuizToQuizSet([response.data.id], id);
      if (newResponse.status === 200) {
        showSnackbar(newResponse.data);
        fetchQuizSetDetail();
      }
    }
  };

  const handlePraticeCancel = () => {
    setShowQuiz(false);
    localStorage.setItem("showQuiz", JSON.stringify(false));
  };

  return (
    <div className="p-4">
    {!showQuiz ? ( <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        {quizsetDetail ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                {isEditing.name ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editedFields.name}
                      onChange={(e) => handleChangeField("name", e.target.value)}
                      className="border rounded px-2 py-1 mr-2"
                    />
                    <button
                      onClick={() => handleSaveField("name")}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <h2
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => handleEditField("name")}
                  >
                    {quizsetDetail ? quizsetDetail.name : "Loading..."}
                  </h2>
                )}
              </div>
            </div>
            <div className="mb-4">
              {isEditing.description ? (
                <div className="flex items-center">
                  <textarea
                    value={editedFields.description}
                    onChange={(e) => handleChangeField("description", e.target.value)}
                    className="border rounded px-2 py-1 w-full mr-2"
                  />
                  <button
                    onClick={() => handleSaveField("description")}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p
                  className="text-gray-700 cursor-pointer"
                  onClick={() => handleEditField("description")}
                >
                  {quizsetDetail.description}
                </p>
              )}
            </div>
            <div className="flex items-center mb-4">
              {isEditing.timeLimit ? (
                <div className="flex items-center">
                  <input
                    type="number"
                    value={editedFields.timeLimit}
                    onChange={(e) => handleChangeField("timeLimit", e.target.value)}
                    className="border rounded px-2 py-1 mr-2"
                  />
                  <button
                    onClick={() => handleSaveField("timeLimit")}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p
                  className="text-gray-700 cursor-pointer"
                  onClick={() => handleEditField("timeLimit")}
                >
                  Time Limit: {quizsetDetail.timeLimit} seconds
                </p>
              )}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <p>
                  Date Created: {format(new Date(quizsetDetail.createdTime), "MMMM d, yyyy h:mm:ss a")}
                </p>
                <p>
                  <b>Owner: {quizsetDetail.creator.name}</b>
                </p>
              </div>
              <button
              onClick={()=>handleAllowShowAnswer(quizsetDetail)}
                className={`px-4 py-2 rounded-lg ${
                  quizsetDetail.allowShowAnswer ? "bg-red-500" : "bg-blue-500"
                } text-white`}
              >
                
                Practice
              </button>
            </div>
          </div>
        ) : (
          <div>Loading quiz set details...</div>
        )}

        <div className="mt-6 space-y-4">
          {quizsetQuizzes.length !== 0 ? (
            quizsetQuizzes.map((quiz) => (
              <QuizListItem
                key={quiz.id}
                content={quiz.content}
                type={quiz.type}
                createdAt={format(new Date(quiz.createdAt), "MMMM d, yyyy h:mm:ss a")}
                topic={quiz.topic.name}
                onAction={()=>handleRemoveQuizFromQuizSet(quiz)}
                actionType="delete"
              />
            ))
          ) : (
            <div>No quizzes yet</div>
          )}
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
    </div>):
   (
      <QuizStartPage onCancel={()=>handlePraticeCancel()} id={id} name={quizsetDetail.name} maxTime={quizsetDetail.timeLimit}/>)}
    </div>
  );
};

export default QuizsetDetail;
