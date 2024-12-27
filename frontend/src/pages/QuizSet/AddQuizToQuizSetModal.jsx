import React, { useState } from "react";
import TabNavigation from "../../components/TabNavigation";

const AddQuizToQuizSetModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
        <h2 className="text-xl font-bold mb-4">Add Quiz to Quiz Set</h2>
        <TabNavigation
          tabs={["From Quiz Library", "New Question"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 0 && (
          <div className="mt-4">
            <p>Quiz Library Content...</p>
          </div>
        )}

        {activeTab === 1 && (
          <div className="mt-4">
            <p>New Question Content...</p>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizToQuizSetModal;
