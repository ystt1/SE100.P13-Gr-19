import React from "react";



const Modal = ({ isOpen, onClose, title, onSubmit, name, setName, description, setDescription,id }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">{id==""? "Add Topic":"Edit Topic"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-4">
            <label htmlFor="topicName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="topicName"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="topicDescription" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="topicDescription"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
