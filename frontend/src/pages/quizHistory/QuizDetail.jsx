import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import HistoryService from "../../data/service/history_service";
import QuizSetService from "../../data/service/quiz_set_service";
import QuizsetDetail from "../QuizSet/QuizsetDetail";
const QuizDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [quizDetails, setQuizDetails] = useState(null);
  const [quizSetDetails,setQuizSetDetails]=useState(null);
  const [allowShow,setAllowShow]=useState(false);
  // Lấy chi tiết bài kiểm tra từ API
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await HistoryService.getDetail(id);
        const response2=await QuizSetService.getQuizSetDetail(id);
        console.log(response);
        
        setAllowShow(response2.data.allowShowAnswer)
        setQuizDetails(response);
        setQuizSetDetails(response2.data);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [id]);

  const renderShortAnswer = (answer) => (
    <div>
      <p className="mt-2">
        <span className="font-medium">Your Answer:</span> {answer.shortAnswer.filledContent}
      </p>
      <p>
        <span className="font-medium">Correct Answer:</span>{" "}
        {answer.shortAnswer.content}
      </p>
    </div>
  );

  const renderSingleChoice = (answer) => (
    <ul className="mt-2 space-y-2">
      {answer.options.map((option, index) => (
        <li
          key={index}
          className={`p-2 rounded-lg ${
            option.isCorrect
              ? "bg-green-100 text-green-600"
              : option.isSelected
              ? "bg-red-100 text-red-600"
              : ""
          }`}
        >
          {option.content} {option.isSelected ? "(Your Choice)" : ""}
        </li>
      ))}
    </ul>
  );

  const renderMultipleChoice = (answer) => (
    <ul className="mt-2 space-y-2">
      {answer.options.map((option, index) => (
        <li
          key={index}
          className={`p-2 rounded-lg ${
            option.isCorrect
              ? "bg-green-100 text-green-600"
              : option.isSelected
              ? "bg-red-100 text-red-600"
              : ""
          }`}
        >
          {option.content} {option.isSelected ? "(Your Choice)" : ""}
        </li>
      ))}
    </ul>
  );

  const renderFillInTheBlank = (answer) => (
    <ul className="mt-2 space-y-2">
      {answer.blanks.map((blank, index) => (
        <li key={index}>
          <span className="font-medium">Blank {index + 1}:</span>{" "}
          <span className="text-gray-700">{blank.filledContent}</span>{" "}
          <span className="text-green-500">(Correct: {blank.content})</span>
        </li>
      ))}
    </ul>
  );

  const renderDragAndDrop = (answer) => (
    <ul className="mt-2 space-y-2">
      {answer.blanks.map((blank, index) => (
        <li key={index}>
          <span className="font-medium">Drop Zone {index + 1}:</span>{" "}
          <span className="text-gray-700">{blank.filledContent}</span>{" "}
          <span className="text-green-500">(Correct: {blank.content})</span>
        </li>
      ))}
    </ul>
  );

  const renderQuestion = (answer) => {
    switch (answer.type) {
      case "SHORT_ANSWER":
        return renderShortAnswer(answer);
      case "SINGLE_CHOICE":
        return renderSingleChoice(answer);
      case "MULTIPLE_CHOICE":
        return renderMultipleChoice(answer);
      case "FILL_IN_THE_BLANK":
        return renderFillInTheBlank(answer);
      case "DRAG_AND_DROP":
        return renderDragAndDrop(answer);
      default:
        return null;
    }
  };

  if (!quizDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md" />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">{quizSetDetails.name||"UnKnown"}</h1>

        {/* Quiz Summary */}
        <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
          <p>
            <span className="font-medium">Attempt Time:</span> {quizDetails.attemptTime} times
          </p>
          <p>
            <span className="font-medium">Correct Answers:</span>{" "}
            {quizDetails.numberCorrect}/{quizDetails.quizAnswers.length}
          </p>
          <p>
            <span className="font-medium">Completion Time:</span> {quizDetails.completeTime} / {quizSetDetails.timeLimit} seconds
          </p>
        </div>

        {/* Questions */}
        {quizDetails.quizAnswers.map((answer) => (
          <div
            key={answer.id}
            className={`mb-6 border rounded-lg p-4 shadow-md ${
              answer.isCorrect ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{answer.content}</h3>
              <span className="text-sm italic text-gray-600">
                {answer.type.replace("_", " ")}
              </span>
            </div>
            {renderQuestion(answer)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDetails;