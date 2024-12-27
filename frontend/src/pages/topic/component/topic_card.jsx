import React from "react";

export default function TopicCard({ name, description, usageCount, owner }) {
  return (
    <div className="flex flex-col p-3 rounded-lg shadow-md border border-gray-200 bg-white text-gray-700 w-56">
      <div className="text-lg font-semibold text-center text-blue-700">
        {name}
      </div>
      <div className="mt-3 text-sm text-gray-600 line-clamp-3">
        {description}
      </div>
      <div className="mt-3 text-xs font-medium">Used: {usageCount} times</div>
      <div className="mt-1 text-xs text-gray-500">Owner: {owner}</div>
    </div>
  );
}
