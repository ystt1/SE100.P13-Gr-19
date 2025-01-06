import React, { useState, useEffect } from "react";
import TopicService from "../../data/service/topic_service";
import ShortAnswerInput from "./components/short_answer_input";
import SingleChoiceInput from "./components/single_choice_input";
import MultipleChoiceInput from "./components/multiple_choice_input";
import FillInTheBlankInput from "./components/fill_in_the_blank_input";
import DragAndDropInput from "./components/drag_and_drop_input";
import QuizService from "../../data/service/quiz_service";

const AddQuizModal = ({ onClose, onSubmit,onSuccess }) => {
  const [topics, setTopics] = useState([]);
  const [quizData, setQuizData] = useState({
    question: "",
    topic: "",
    type: "SHORT_ANSWER",
    answers: [{ text: "", isCorrect: false }],
    correctAnswer: "",
    fillText: "",
    dragOptions: [],
  });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await TopicService.getAllTopic();
        setTopics(response.topics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleSubmit = async () => {
    console.log(quizData);
    
    if (quizData.topic === "") {
      alert("Vui lòng chọn topic");
      return;
    }
    const finalQuizData = {
      ...quizData,
      fillText: quizData.fillText,
      dragOptions: quizData.dragOptions,
    };

    try {
      await onSubmit(finalQuizData); // Sử dụng hàm onSubmit từ props
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding quiz:", error);
      alert("Failed to add quiz. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Create New Quiz</h2>
        <input
          type="text"
          placeholder="Question"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizData.question}
          onChange={(e) => setQuizData({ ...quizData, question: e.target.value })}
        />
        <select
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizData.topic}
          onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })}
        >
          <option value="" disabled>
            Select Topic
          </option>
          {topics.map((topic) => (
            <option  key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        <select
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizData.type}
          onChange={(e) => setQuizData({ ...quizData, type: e.target.value })}
        >
          <option value="SHORT_ANSWER">Short Answer</option>
          <option value="SINGLE_CHOICE">Single Choice</option>
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
          <option value="DRAG_AND_DROP">Drag and Drop</option>
        </select>

        {quizData.type === "SHORT_ANSWER" && (
          <ShortAnswerInput
            correctAnswer={quizData.correctAnswer}
            setQuizData={setQuizData}
          />
        )}
        {quizData.type === "SINGLE_CHOICE" && (
          <SingleChoiceInput quizData={quizData} setQuizData={setQuizData} />
        )}
        {quizData.type === "MULTIPLE_CHOICE" && (
          <MultipleChoiceInput quizData={quizData} setQuizData={setQuizData} />
        )}
        {quizData.type === "FILL_IN_THE_BLANK" && (
          <FillInTheBlankInput quizData={quizData} setQuizData={setQuizData} />
        )}
        {quizData.type === "DRAG_AND_DROP" && (
          <DragAndDropInput quizData={quizData} setQuizData={setQuizData} />
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizModal;
