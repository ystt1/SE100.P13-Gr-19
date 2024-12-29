import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaListAlt, FaQuestion, FaHistory, FaUser, FaUsers, FaSignOutAlt, FaTags } from "react-icons/fa";
import quizlogo from "../images/quiz-logo.ico";
import AuthService from "../data/service/auth_service";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white text-gray-600 flex flex-col shadow-md">
      <div className="p-4 text-xl font-bold text-blue-600 text-center flex items-center justify-center gap-2">
        <a href="/">
          <img
            src={quizlogo}
            alt="Logo"
            className="h-8 w-8"
          />
        </a>
        <a href="/">Quiz App </a> 
      </div>
      <nav className="flex-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-5 hover:bg-gray-100 ${
              isActive ? "bg-blue-500 text-white rounded-md" : ""
            }`
          }
        >
          <FaHome className="text-lg" />
          Dashboard
        </NavLink>
        <NavLink
          to="/quiz-set"
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-5 hover:bg-gray-100 ${
              isActive ? "bg-blue-500 text-white rounded-md" : ""
            }`
          }
        >
          <FaListAlt className="text-lg" />
          Quiz Set
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-5 hover:bg-gray-100 ${
              isActive ? "bg-blue-500 text-white rounded-md" : ""
            }`
          }
        >
          <FaQuestion className="text-lg" />
          Quiz
        </NavLink>
        
        <NavLink
          to="/quiz-history"
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-5 hover:bg-gray-100 ${
              isActive ? "bg-blue-500 text-white rounded-md" : ""
            }`
          }
        >
          <FaHistory className="text-lg" />
          Quiz History
        </NavLink>


        <NavLink
          to="/topic"
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-5 hover:bg-gray-100 ${
              isActive ? "bg-blue-500 text-white rounded-md" : ""
            }`
          }
        >
          <FaTags className="text-lg" />
          Topic
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-5 hover:bg-gray-100 ${
              isActive ? "bg-blue-500 text-white rounded-md" : ""
            }`
          }
        >
          <FaUser className="text-lg" />
          Profile
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-5 hover:bg-gray-100 ${
              isActive ? "bg-blue-500 text-white rounded-md" : ""
            }`
          }
        >
          <FaUsers className="text-lg" />
          Teams
        </NavLink>
      </nav>
      <NavLink
      to="/login"
      onClick={() => {
        AuthService.logout(); 
      }}
      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
    >
      <FaSignOutAlt className="text-lg" />
      <span>Log Out</span>
    </NavLink>
    </div>
  );
};

export default Sidebar;
