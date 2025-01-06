import React, { useState } from "react";
import QuizSetService from "../../../data/service/quiz_set_service";
import { useSnackbar } from "../../../components/NotificationBat"
const EditModal = ({ show, onClose, quizsetDetail, onSave }) => {
  const [formData, setFormData] = useState({
    name: quizsetDetail.name || "",
    description: quizsetDetail.description || "",
    timeLimit: quizsetDetail.timeLimit || "",
    allowShowAnswer: quizsetDetail.allowShowAnswer || false,
  });
  const { showSnackbar } = useSnackbar();
  const handleChangeAllowShow= async()=>{
    var response;
    if(quizsetDetail.allowShowAnswer)
    {
        response=await QuizSetService.changDisableShowAnswer(quizsetDetail.id)
    }
    else{
        response=await QuizSetService.changeAllowShowAnswer(quizsetDetail.id)
    }
    console.log(response);
    if(response.status==200)
    {
        showSnackbar(response.data+" success")
        setFormData((prev) => ({
            ...prev,
            allowShowAnswer: !prev.allowShowAnswer,
          }));
    }
};


  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Quiz Set</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Time Limit (seconds)</label>
          <input
            type="number"
            value={formData.timeLimit}
            onChange={(e) => handleChange("timeLimit", e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-6 flex items-center">
          <span className="font-semibold mr-4">Allow Show Answer</span>
          <div
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
              formData.allowShowAnswer ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={()=>{handleChangeAllowShow()}}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                formData.allowShowAnswer ? "translate-x-6" : ""
              }`}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
