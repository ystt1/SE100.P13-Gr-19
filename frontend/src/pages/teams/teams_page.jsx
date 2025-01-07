import React, { useState, useEffect } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaSearch } from "react-icons/fa";

import { useSnackbar } from "../../components/NotificationBat";
import TeamService from "../../data/service/team_service";
import Pagination from "../topic/component/pagination";


const TeamsPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();

  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", maxParticipant: 30 });
  const [totalPages,setTotalPages]=useState(1)
  const currentTab = searchParams.get("tab") || "all"; // Default tab is "all"
  const currentPage = parseInt(searchParams.get("page") || "1", 10); // Default page is 1
  const itemsPerPage = 6;

  const fetchTeams = async () => {
    try {
      let data;
      if (currentTab === "all") {
        data = await TeamService.getAllTeam(currentPage, itemsPerPage, searchQuery);
      } else if (currentTab === "my-team") {
        data = await TeamService.getMyTeams(currentPage, itemsPerPage, searchQuery);
      } else if (currentTab === "joined") {
        data = await TeamService.getJoinedTeams(currentPage, itemsPerPage, searchQuery);
      }
      setTeams(data?.teams || []); // Assuming API returns { teams: [], totalPages: 0 }
      setTotalPages(data.totalPages)
    } catch (error) {
      showSnackbar("Failed to fetch teams", "error");
      console.error("Error fetching teams:", error);
    }
  };

  const handleTabChange = (tab) => {
    setSearchParams({ tab, page: "1" }); // Reset to page 1 on tab change
  };

  // Handle page change
  const handlePageChange = (page) => {
    setSearchParams({ tab: currentTab, page: page.toString() });
  };

  // Fetch teams whenever tab, page, or search query changes
  useEffect(() => {
    fetchTeams();
  }, [currentTab, currentPage, searchQuery]);

  const handleCreateTeam = async () => {
    try {
      const response = await TeamService.addTeam(newTeam);
      if (response === "success") {
        showSnackbar("Team created successfully", "success");
        setShowModal(false);
        setNewTeam({ name: "", maxParticipant: 30 });
        fetchTeams()
      } else {
        showSnackbar(response, "error");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      showSnackbar("Failed to create team", "error");
    }
  };

  


  const handleTeamClick = (team) => {
    console.log(team);
    
    // if (team.status === 1) {
    //   // My Team
    //   navigate(`/teams/${team.id}/detail`);
    // } else if (team.status === 0) {
    //   // Managed Team
    //   navigate(`/teams/${team.id}/manage`);
    // }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        {/* Tabs */}
        <div className="mb-4 flex justify-between items-center">
          <ul className="flex space-x-4">
            {["all", "my-team", "joined"].map((tab) => (
              <li key={tab}>
                <button
                  className={`px-4 py-2 rounded ${currentTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab === "all"
                    ? "All Teams"
                    : tab === "my-team"
                      ? "My Teams"
                      : 
                         "Joined Teams"
                        }
                </button>
              </li>
            ))}
          </ul>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setShowModal(true)}
          >
            Create Team
          </button>
        </div>

        {/* Search Bar */}
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

        {/* Team List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div onClick={()=>handleTeamClick(team)} key={team.id} className="p-4 border rounded shadow-md bg-white flex flex-col">
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
              <p className="text-sm text-gray-500">Owner: {team.creatorUser.name}</p>
              <p className="text-sm text-gray-500">
                Members: {team.members}/{team.maxParticipant}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages} // Replace with actual totalPages from API
          onPageChange={handlePageChange}
        />

        {/* Modal */}
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
                <label className="block text-sm font-medium mb-2">Max Participant</label>
                <input
                  className="w-full px-4 py-2 border rounded"
                  type="number"
                  value={newTeam.maxParticipant}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, maxParticipant: parseInt(e.target.value, 10) || "" })
                  }
                />
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
                  onClick={() => handleCreateTeam()}
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

export default TeamsPage;
