import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaSearch } from "react-icons/fa";
import TeamService from "../../data/service/team_service";
import { useSnackbar } from "../../components/NotificationBat";

const mockTeams = [
  { id: 1, name: "Team A", owner: "User1", status: 1, members: 5, limit: 10, image: "/team_a.jpg" },
  { id: 2, name: "Team B", owner: "User2", status: 0, members: 8, limit: 15, image: "/team_b.jpg" },
  { id: 3, name: "Team C", owner: "User3", status: 2, members: 3, limit: 12, image: "/team_c.jpg" },
  { id: 4, name: "Team D", owner: "User4", status: 3, members: 7, limit: 10, image: "/team_d.jpg" },
];


const TeamsPage = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", description: "" });

  // Mock data logic
  useEffect(() => {
    const fetchMockTeams = () => {
      setTeams(mockTeams);
    };
    fetchMockTeams();
  }, []);

  //API 
  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     try {
  //       const fetchedTeams = await TeamService.getAllTeams();
  //       setTeams(fetchedTeams);
  //     } catch (error) {
  //       console.error("Error fetching teams:", error);
  //       showSnackbar("Failed to fetch teams", "error");
  //     }
  //   };
  //   fetchTeams();
  // }, []);

  const handleCreateTeam = async () => {
    try {
      const response = await TeamService.addTeam(newTeam);
      if (response === "success") {
        showSnackbar("Team created successfully", "success");
        setShowModal(false);
        setNewTeam({ name: "", description: "" });
        const updatedTeams = await TeamService.getAllTeams();
        setTeams(updatedTeams);
      } else {
        showSnackbar(response, "error");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      showSnackbar("Failed to create team", "error");
    }
  };

  const handleJoinTeam = async (teamId) => {
    try {
      const response = await TeamService.joinTeam(teamId);
      if (response === "success") {
        showSnackbar("Joined team successfully", "success");
        const updatedTeams = await TeamService.getAllTeams();
        setTeams(updatedTeams);
      } else {
        showSnackbar(response, "error");
      }
    } catch (error) {
      console.error("Error joining team:", error);
      showSnackbar("Failed to join team", "error");
    }
  };

  const handleCancelRequest = async (teamId) => {
    try {
      const response = await TeamService.cancelJoinRequest(teamId);
      if (response === "success") {
        showSnackbar("Join request canceled", "success");
        const updatedTeams = await TeamService.getAllTeams();
        setTeams(updatedTeams);
      } else {
        showSnackbar(response, "error");
      }
    } catch (error) {
      console.error("Error canceling join request:", error);
      showSnackbar("Failed to cancel join request", "error");
    }
  };

  const handleJoinTeamRequest = async (teamId) => {
    // Mock
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, status: 3 } : team
    );
    setTeams(updatedTeams);
  
    // API 
    // try {
    //   const response = await TeamService.joinTeamRequest(teamId);
    //   if (response === "success") {
    //     showSnackbar("Join request sent successfully", "success");
    //     const updatedTeams = await TeamService.getAllTeams();
    //     setTeams(updatedTeams);
    //   } else {
    //     showSnackbar(response, "error");
    //   }
    // } catch (error) {
    //   console.error("Error sending join request:", error);
    //   showSnackbar("Failed to send join request", "error");
    // }
  };
  
  const handleCancelJoinRequest = async (teamId) => {
    // Mock 
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, status: 2 } : team
    );
    setTeams(updatedTeams);
  
    // API 
    // try {
    //   const response = await TeamService.cancelJoinRequest(teamId);
    //   if (response === "success") {
    //     showSnackbar("Join request canceled successfully", "success");
    //     const updatedTeams = await TeamService.getAllTeams();
    //     setTeams(updatedTeams);
    //   } else {
    //     showSnackbar(response, "error");
    //   }
    // } catch (error) {
    //   console.error("Error canceling join request:", error);
    //   showSnackbar("Failed to cancel join request", "error");
    // }
  };


  const handleTeamClick = (team) => {
    if (team.status === 1) {
      // My Team
      navigate(`/teams/${team.id}/detail`);
    } else if (team.status === 0) {
      // Managed Team
      navigate(`/teams/${team.id}/manage`);
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
        {/* Tabs */}
        <div className="mb-4 flex justify-between items-center">
          <ul className="flex space-x-4">
            {["all", "1", "0", "2", "3"].map((tab) => (
              <li key={tab}>
                <button
                  className={`px-4 py-2 rounded ${
                    activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "all"
                    ? "All Teams"
                    : tab === "1"
                    ? "My Teams"
                    : tab === "0"
                    ? "Managed Teams"
                    : tab === "2"
                    ? "Not Joined"
                    : "Pending Response"}
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
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="p-4 border rounded shadow-md bg-white flex flex-col"
              onClick={() => handleTeamClick(team)}
            >
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
              <p className="text-sm text-gray-500">Owner: {team.owner}</p>
              <p className="text-sm text-gray-500">
                Members: {team.members}/{team.limit}
              </p>
              {team.status === 2 && (
                <button
                  onClick={() => handleJoinTeamRequest(team.id)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                >
                  Join
                </button>
              )}
              {team.status === 3 && (
                <button
                  onClick={() => handleCancelJoinRequest(team.id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>


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
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, name: e.target.value })
                  }
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

export default TeamsPage;
