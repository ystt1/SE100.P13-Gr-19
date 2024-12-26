import React from "react";
import QuizSetDashboard from "../components/QuizSetDashboard";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";


const QuizSetPage = () => {
  return (
    <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-6 bg-gray-50">
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
  
    
          <div className="min-h-screen bg-gray-50 p-6">
              <QuizSetDashboard />
          </div>
       
        </div>
      </div>
    );

};

export default QuizSetPage;
