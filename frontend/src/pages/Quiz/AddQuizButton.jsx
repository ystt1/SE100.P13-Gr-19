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
          className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700"
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
