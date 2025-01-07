import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [totalPages, setTotalPages] = useState(1);
  const currentTab = searchParams.get("tab") || "all";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 6;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

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
      setTeams(data?.teams || []);
      setTotalPages(data.totalPages);
    } catch (error) {
      showSnackbar("Failed to fetch teams", "error");
      console.error("Error fetching teams:", error);
    }
  };

  const handleTabChange = (tab) => {
    setSearchParams({ tab, page: "1" });
  };

  const handlePageChange = (page) => {
    setSearchParams({ tab: currentTab, page: page.toString() });
  };

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
        fetchTeams();
      } else {
        showSnackbar(response, "error");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      showSnackbar("Failed to create team", "error");
    }
  };

  const handleTeamClick = (team) => {
    const { status } = team;
    if (status === "NONE") {
      setSelectedTeam(team);
      setShowInfoModal(true);
    } else if (status === "CREATOR") {
      navigate(`/teams/${team.id}/manage`);
    } else if (status === "MEMBER") {
      navigate(`/teams/${team.id}/detail`);
    }
    if(currentTab === "my-team")
    {
      navigate(`/teams/${team.id}/manage`);
    }
    if(currentTab === "joined")
    {
      navigate(`/teams/${team.id}/detail`);
    }
  };

  const sendJoinRequest = async (teamId) => {
    try {
      const response = await TeamService.sendJoinRequest(teamId);
      if (response.status === 200) {
        showSnackbar(response.data);
      } else {
        showSnackbar("Error", "error");
      }
    } catch (error) {
      console.error("Error sending join request:", error);
      showSnackbar("Failed to send join request", "error");
    } finally {
      setShowInfoModal(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        {/* Tabs */}
        <div className="mb-4 flex justify-between items-center">
          <ul className="flex space-x-4">
            {[
              "all",
              "my-team",
              "joined",
            ].map((tab) => (
              <li key={tab}>
                <button
                  className={`px-4 py-2 rounded ${
                    currentTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab === "all"
                    ? "All Teams"
                    : tab === "my-team"
                    ? "My Teams"
                    : "Joined Teams"}
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
            <div
              onClick={() => handleTeamClick(team)}
              key={team.id}
              className="p-4 border rounded shadow-md bg-white flex flex-col"
            >
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
              <p className="text-sm text-gray-500">Owner: {team.creatorUser.name}</p>
              <p className="text-sm text-gray-500">
                Members: {team.members}/{team.maxParticipant}
              </p>
              <p className="text-sm text-gray-500">
                Status: {team.status}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
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
                    setNewTeam({
                      ...newTeam,
                      maxParticipant: parseInt(e.target.value, 10) || "",
                    })
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

        {showInfoModal && selectedTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">{selectedTeam.name}</h2>
              <p className="mb-2">
                <strong>Owner:</strong> {selectedTeam.creatorUser.name}
              </p>
              <p className="mb-2">
                <strong>Members:</strong> {selectedTeam.currentParticipant}/{
                  selectedTeam.maxParticipant
                }
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {selectedTeam.description ||
                  "No description available"}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowInfoModal(false)}
                >
                  Close
                </button>
                {selectedTeam.status === "NONE" && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => sendJoinRequest(selectedTeam.id)}
                  >
                    Send Join Request
                  </button>
                )}
                {selectedTeam.status === "PENDING" && (
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                    disabled
                  >
                    Waiting
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
