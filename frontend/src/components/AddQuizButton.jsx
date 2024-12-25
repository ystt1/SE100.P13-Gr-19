import * as React from "react";

function AddQuizButton() {
  return (
    <div className="fixed bottom-4 right-4">
      <button className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-full shadow-lg">
        <span className="text-xl">Add Quiz</span>
      </button>
    </div>
  );
}

export default AddQuizButton;
