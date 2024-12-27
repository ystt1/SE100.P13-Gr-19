import React from "react";

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`px-4 py-2 ${
            activeTab === index
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
