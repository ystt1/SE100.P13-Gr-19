import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/Sidebar";

const QuizSetDetails = () => {
  const navigate = useNavigate();

  // Mock data
  const quizSetDetails = {
    title: "Quiz about computer",
    description:
      "A description is a detailed account or explanation of an object, idea, event, person, or any subject of interest. It serves as a means to communicate the characteristics, qualities, and attributes of the subject in a manner that allows others to visualize, understand, or relate to it. By providing such a holistic view, a long description becomes a powerful tool for conveying not only what the subject is but also what it means within a broader framework.",
    questions: 15,
    minutes: 15,
    participants: 1999,
    owner: "Trung Huynh",
    topics: ["Technology", "Innovation", "Science", "Programming"],
    imageUrl: "/img-bg-quiz.jpg",
    suggestedQuizzes: [
      { title: "Quiz about AI", imageUrl: "/img-quiz.jpg", progress: 90 },
      { title: "Programming Basics", imageUrl: "/img-quiz.jpg", progress: 70 },
      { title: "Advanced Mathematics", imageUrl: "/img-quiz.jpg", progress: 50 },
      { title: "History of Computers", imageUrl: "/img-quiz.jpg", progress: 80 },
    ],
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <SideBar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50" />

      {/* Main Content */}
      <div className="ml-64 flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-red-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-blue-300 flex items-center gap-2 mb-4"
          >
            ← Back
          </button>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 lg:gap-12">
            {/* Left Section: Image */}
            <img
              src={quizSetDetails.imageUrl}
              alt={quizSetDetails.title}
              className="w-full lg:w-1/2 h-64 object-cover rounded-lg mb-6 lg:mb-0"
            />
            {/* Right Section: Info */}
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-3xl font-bold text-blue-800 mb-4">
                {quizSetDetails.title}
              </h1>
              <div className="flex justify-between items-center w-full mb-4 text-gray-600 text-sm">
                <p>{quizSetDetails.questions} Questions</p>
                <p>{quizSetDetails.minutes} Min</p>
                <p>{quizSetDetails.participants} Participants</p>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-600">
                  Created By: <span className="font-bold">{quizSetDetails.owner}</span>
                </span>
                <button className="text-red-500">
                  <span className="border border-red-500 rounded-full p-2">
                    ❤️
                  </span>
                </button>
              </div>
              <button
                className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700"
                onClick={() => navigate("/quiz/attempt")}
              >
                Start Quiz
              </button>
            </div>
          </div>

          {/* Topics Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Topic</h2>
            <div className="flex gap-2 flex-wrap">
              {quizSetDetails.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Description
            </h2>
            <p className="text-gray-600">{quizSetDetails.description}</p>
          </div>

          {/* Suggest Section */}
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Suggest
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quizSetDetails.suggestedQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={quiz.imageUrl}
                    alt={quiz.title}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-base font-semibold text-gray-700 mb-2">
                    {quiz.title}
                  </h3>
                  <div className="text-sm text-gray-600">
                    Progress: <span className="font-bold">{quiz.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSetDetails;
