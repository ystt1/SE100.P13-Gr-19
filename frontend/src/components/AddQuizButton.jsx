import React, { useState } from "react";
import AddQuizModal from "./AddQuizModal";

function AddQuizButton({ onSubmit }) {
  const [showModal, setShowModal] = useState(false);

  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleOpenModal}
          className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-full shadow-lg"
        >
          <span className="text-xl">Add Quiz</span>
        </button>
      </div>
   
      {showModal && (
        <AddQuizModal
          onClose={handleCloseModal}
          onSubmit={(quizData) => {
            onSubmit(quizData);
            handleCloseModal();
          }}
        />
      )}
    </>
  );
}

export default AddQuizButton;
