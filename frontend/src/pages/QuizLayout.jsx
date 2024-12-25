import * as React from "react";
import SearchBar from "../components/SearchBar";
import QuestionCard from "../components/QuestionCard";
import Pagination from "../components/Pagination";
import AddQuizButton from "../components/AddQuizButton";
import Sidebar from "../components/Sidebar";

const questions = [
    {
      id: 1,
      number: "1",
      question: "1+1= ?",
      topic: "Math",
      answers: [
        { text: "This is a correct Answer", isCorrect: true },
        { text: "This is a wrong Answer", isCorrect: false },
        { text: "This is a wrong Answer", isCorrect: false },
        { text: "This is a wrong Answer", isCorrect: false }
      ]
    },
    {
      id: 2,
      number: "2",
      question: "1+1= ?",
      topic: "Math",
      isTextInput: true,
      answer: "ABCD"
    },
    {
      id: 3,
      number: "3",
      question: "1+1= ?",
      topic: "Math",
      isMultiChoice: true,
      answers: [
        { text: "This is a wrong Answer", isCorrect: false },
        { text: "This is a wrong Answer", isCorrect: true },
        { text: "This is a wrong Answer", isCorrect: false },
        { text: "This is a wrong Answer", isCorrect: false }
      ]
    },
    
  ];

function QuizLayout() {
    return (
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-1 ml-64 p-6 bg-gray-50">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Quiz</h1>
            <div className="flex items-center space-x-4">
              <div className="text-xl">Trung huynh</div>
              <img
                src="https://static.vecteezy.com/system/resources/previews/011/483/813/original/guy-anime-avatar-free-vector.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
            </div>
          </div>          

          <SearchBar />    

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
  
    
          <Pagination />
          <AddQuizButton />
        </div>
      </div>
    );
  }

export default QuizLayout;
