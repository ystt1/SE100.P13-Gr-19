import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import QuizService from "../../../data/service/quiz_service";

const QuizCompletePage = () => {
  const navigate = useNavigate();
  const { id: quizSetId } = useParams(); // quizSet ID từ URL
  const location = useLocation();
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    // Lấy dữ liệu từ location.state
    if (location.state && location.state.result) {
      setUserAnswers(location.state.result.userAnswers || {});
    }

    // Lấy thông tin quiz từ API
    const fetchQuizData = async () => {
      try {
        const data = await QuizService.getQuizSet(quizSetId); // Gọi API để lấy danh sách câu hỏi
        setQuizData(data.questions);
        calculateResults(data.questions);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu quiz:", error);
      }
    };

    fetchQuizData();
  }, [location.state, quizSetId]);

  // Hàm tính toán kết quả dựa vào câu trả lời
  const calculateResults = (questions) => {
    let correct = 0;
    let incorrect = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        // MULTIPLE_CHOICE
        if (
          JSON.stringify(userAnswer?.sort()) ===
          JSON.stringify(question.correctAnswer.sort())
        ) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    setResult({ correct, incorrect });
  };

  // Render câu hỏi và kết quả
  const renderQuestion = (question, index) => {
    const userAnswer = userAnswers[question.id];
    return (
      <div key={index} className="mb-4 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">
          {index + 1}. {question.question}
        </h3>
        <div>
          {question.type === "SINGLE_CHOICE" && (
            <div>
              {question.options.map((option, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 mb-1 ${
                    userAnswer === option
                      ? userAnswer === question.correctAnswer
                        ? "text-green-500"
                        : "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    checked={userAnswer === option}
                    disabled
                    className="cursor-not-allowed"
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}

          {question.type === "FILL_IN_THE_BLANK" && (
            <input
              type="text"
              value={userAnswer || ""}
              disabled
              className={`w-full border p-2 rounded ${
                userAnswer === question.correctAnswer
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            />
          )}

          {question.type === "SHORT_ANSWER" && (
            <input
              type="text"
              value={userAnswer || ""}
              disabled
              className={`w-full border p-2 rounded ${
                userAnswer === question.correctAnswer
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            />
          )}

          {question.type === "MULTIPLE_CHOICE" && (
            <div>
              {question.options.map((option, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 mb-1 ${
                    userAnswer?.includes(option)
                      ? question.correctAnswer.includes(option)
                        ? "text-green-500"
                        : "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={userAnswer?.includes(option)}
                    disabled
                    className="cursor-not-allowed"
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-2">
          <strong>Your Answer:</strong>{" "}
          {Array.isArray(userAnswer)
            ? userAnswer.join(", ")
            : userAnswer || "No Answer"}
        </p>
        <p>
          <strong>Correct Answer:</strong>{" "}
          {Array.isArray(question.correctAnswer)
            ? question.correctAnswer.join(", ")
            : question.correctAnswer}
        </p>
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Quiz Complete</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>
            Total Questions: <strong>{quizData.length}</strong>
          </p>
          <p>
            Correct Answers:{" "}
            <strong className="text-green-500">{result.correct}</strong>
          </p>
          <p>
            Incorrect Answers:{" "}
            <strong className="text-red-500">{result.incorrect}</strong>
          </p>
        </div>

        {/* Detailed Results */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
          {quizData.map((question, index) => renderQuestion(question, index))}
        </div>
      </div>
    </div>
  );
};

export default QuizCompletePage;
