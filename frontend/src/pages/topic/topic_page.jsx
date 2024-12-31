import React, { useEffect, useState } from "react";
import TopicService from "../../data/service/topic_service";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import TopicCard from "./component/topic_card";
import Modal from "./component/topic_model";
import Pagination from "./component/pagination";
import Sidebar from "../../components/Sidebar";
import { useSnackbar } from "../../components/NotificationBat";

const TopicsPage = () => {
  const { showSnackbar } = useSnackbar();
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortElement, setSortElement] = useState("name");
  const [direction, setDirection] = useState("asc");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "", description: "", id: "" });

  const fetchTopics = async () => {
    try {
      const data = await TopicService.getTopics(currentPage, 8, search, sortElement, direction);
      setTopics(data.topics);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [currentPage, search, sortElement, direction]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  const toggleSortDirection = () => {
    setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleAddTopic = () => {
    setModalData({ name: "", description: "", id: "" });
    setModalOpen(true);
  };

  const handleDeleteTopic = async (topic) => {
    var response = await TopicService.deleteTopic(topic.id);
    if (response == "success") {
      showSnackbar("Delete success");
      fetchTopics();
    }
    else {
      alert(response);
    }
  }

  const handleModalSubmit = async () => {
    var response;
    const { name, description } = modalData;

    if (modalData.id === "") {
      response = await TopicService.addTopic({ name, description });
    } else {
      response = await TopicService.editTopic({ name, description }, modalData.id);
    }

    showSnackbar(response);

    if (response === "success") {
      setModalOpen(false); // Đóng modal
      setModalData({ name: "", description: "", id: "" }); // Reset modalData
      fetchTopics(); // Refresh danh sách topics
    }
  };


  const handleEditTopic = (topic) => {
    setModalData({ name: topic.name, description: topic.description, id: topic.id });
    setModalOpen(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-50 p-6">
        <div className="flex flex-col w-full max-w-5xl mx-auto">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">

            <button
              onClick={handleAddTopic}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600"
            >
              + Add Topic
            </button>


            <div className="flex items-center gap-4 text-lg">
              <span>Sorting:</span>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleSortDirection}
              >
                <span>{sortElement}</span>
                {direction === "asc" ? (
                  <FaSortAlphaDown className="text-lg" />
                ) : (
                  <FaSortAlphaUp className="text-lg" />
                )}
              </div>
            </div>


            <form
              className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 shadow-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="searchTopic" className="text-sm text-gray-600">
                Search Topic:
              </label>
              <input
                id="searchTopic"
                type="text"
                placeholder="Topic Name"
                className="outline-none bg-transparent flex-1 text-gray-700"
                value={search}
                onChange={handleSearchChange}
              />
              <img src="menu_down.png" alt="Search" className="w-5 cursor-pointer" />
            </form>
          </div>

          <div className="border-t my-4" />

          <div className="grid grid-cols-4 gap-8 mt-6">
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                name={topic.name}
                description={topic.description}
                owner={topic.creator?.name || "Unknown"}
                usageCount={topic.quizSets?.length || 0}
                onEdit={() => handleEditTopic(topic)}
                onDelete={() => handleDeleteTopic(topic)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setModalOpen(false); setModalData({ name: "", description: "", id: "" }); }}
        title={modalData.name ? "Edit Topic" : "Add Topic"}
        onSubmit={handleModalSubmit}
        name={modalData.name}
        setName={(name) => setModalData((prev) => ({ ...prev, name }))}
        description={modalData.description}
        setDescription={(description) => setModalData((prev) => ({ ...prev, description }))}
      />
    </div>
  );
};

export default TopicsPage;
