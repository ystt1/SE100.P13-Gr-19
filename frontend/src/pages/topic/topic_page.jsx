import React from "react";
import TopicCard from "./component/topic_card";
import Pagination from "./component/pagination";
import Sidebar from "../../components/Sidebar";

const TopicsPage = () => {
  const topics = [
    {
      name: "Topic Name Example 1",
      description:
        "This is just a long description like this but if it too long you can ... it like Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ...",
      usageCount: 100,
      owner: "tuan@gmail.com",
    },
  ].concat(
    Array(7).fill({
      name: "Topic Name Example 1",
      description:
        "This is just a long description like this but if it too long you can ... it like Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ...",
      usageCount: 100,
      owner: "tuan@gmail.com",
    })
  );

  return (
   <div className="flex ">
      
      <Sidebar />


      <div className="flex-1 ml-64 bg-gray-50 p-6">
        <div className="flex flex-col w-full max-w-5xl mx-auto">



          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">

            <div className="flex items-center gap-4 text-lg">
              <span>Sorting:</span>
              <div className="flex items-center gap-2 cursor-pointer">
                <span>Name</span>
                <img src="sort.png" alt="Sort" className="w-5" />
              </div>
            </div>


            <form className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 shadow-sm">
              <label htmlFor="searchTopic" className="text-sm text-gray-600">
                Search Topic:
              </label>
              <input
                id="searchTopic"
                type="text"
                placeholder="Topic Name"
                className="outline-none bg-transparent flex-1 text-gray-700"
              />
              <img src="menu_down.png" alt="Search" className="w-5 cursor-pointer" />
            </form>
          </div>


          <div className="border-t my-4" />

          <div className="grid grid-cols-4 gap-8 mt-6">
            {topics.map((topic, index) => (
              <TopicCard key={index} {...topic} />
            ))}
          </div>


          <Pagination currentPage={1} totalPages={20} onPageChange={() => { }} />
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;
