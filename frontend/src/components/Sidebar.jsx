import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaListAlt, FaQuestion, FaHistory, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white text-gray-600 flex flex-col shadow-md">
      <div className="p-4 text-xl font-bold text-blue-600 text-center">Quiz App</div>
      <nav className="flex-1">
        <NavLink
          to="/dashboard"
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
        to="/logout"
        className="flex items-center gap-4 py-3 px-5 bg-red-600 hover:bg-red-700 text-white mt-auto"
      >
        <FaSignOutAlt className="text-lg" />
        Log Out
      </NavLink>
    </div>
  );
};

export default Sidebar;
