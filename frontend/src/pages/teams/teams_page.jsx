import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FaSearch } from "react-icons/fa";
import TeamService from "../../data/service/team_service";
import { useSnackbar } from "../../components/NotificationBat";
const Teams = () => { 
   const { showSnackbar } = useSnackbar();
  const [teams, setTeams] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchTeams = async () => {
      const mockData = [
        { id: 1, name: "Team A", owner: "User1", status: 1, members: 5, limit: 10 },
        { id: 2, name: "Team C", owner: "User1", status: 0, members: 8, limit: 10 },
        { id: 3, name: "Team D", owner: "User1", status: 2, members: 3, limit: 10 },
        { id: 4, name: "Team B", owner: "User1", status: 3, members: 7, limit: 10 },
      ];
      setTeams(mockData);
    };

    fetchTeams();
  }, []);

  const handleCreateTeam = async() => {
    var response= await TeamService.addTeams({newTeam});
    if(response=="success")
    {
        showSnackbar("Add Team success");
        setShowModal(false);
        
    }
    else{
        alert(response);
    }
    
  };

  const filteredTeams = teams.filter(
    (team) =>
      (activeTab === "all" || team.status.toString() === activeTab) &&
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="mb-4 flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Teams
              </button>
            </li>
            <li>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "1" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("1")}
              >
                My Teams
              </button>
            </li>
            <li>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "0" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("0")}
              >
                Managed Teams
              </button>
            </li>
            <li>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "2" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("2")}
              >
                Not Joined
              </button>
            </li>
            <li>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "3" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("3")}
              >
                Pending Response
              </button>
            </li>
          </ul>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setShowModal(true)}
          >
            Create Team
          </button>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-1 px-4 py-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="ml-2 text-gray-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="p-4 border rounded shadow-md bg-white flex flex-col"
            >
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
              <p className="text-sm text-gray-500">Owner: {team.owner}</p>
              <p className="text-sm text-gray-500">
                Members: {team.members}/{team.limit}
              </p>
              {team.status === 2 && (
                <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                  Join
                </button>
              )}
              {team.status === 3 && (
                <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Create New Team</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded"
                  value={newTeam.description}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleCreateTeam}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
