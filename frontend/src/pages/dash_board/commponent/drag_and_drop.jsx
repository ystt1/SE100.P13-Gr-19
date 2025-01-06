import { useState } from "react";

const DragAndDropQuestion = ({ question }) => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData("text/plain");
    if (!droppedItems.includes(droppedItem)) {
      setDroppedItems((prev) => [...prev, droppedItem]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{question.content}</h3>
      <div className="flex gap-4">
        {/* Khu vực kéo */}
        <div className="w-1/2 border p-4">
          <h4 className="font-semibold mb-2">Options:</h4>
          {question.options.map((option, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, option.content)}
              className="p-2 bg-blue-100 rounded mb-2 cursor-pointer"
            >
              {option.content}
            </div>
          ))}
        </div>

        {/* Khu vực thả */}
        <div
          className="w-1/2 border p-4 bg-gray-50"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h4 className="font-semibold mb-2">Drop Here:</h4>
          {droppedItems.map((item, index) => (
            <div
              key={index}
              className="p-2 bg-green-100 rounded mb-2"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragAndDropQuestion;
