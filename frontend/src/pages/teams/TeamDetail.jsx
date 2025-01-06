import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TeamService from "../../data/service/team_service";
import { useSnackbar } from "../../components/NotificationBat";

const mockTeamInfo = {
  id: 1,
  name: "Team A",
  description: "This is Team A",
  members: [
    { id: 1, name: "Member A", score: 95, role: "Member" },
    { id: 2, name: "Member B", score: 90, role: "Admin" },
    { id: 3, name: "Member C", score: 85, role: "Member" },
  ],
  quizsets: [
    { id: 1, name: "Quizset 1", bestScore: 100, attempts: 3 },
    { id: 2, name: "Quizset 2", bestScore: 85, attempts: 2 },
  ],
};

const TeamDetail = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch team data (mock or API)
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        //API
        // const data = await TeamService.getTeamDetail(teamId);

        // Mock data for testing
        const data = mockTeamInfo;

        setTeamInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        showSnackbar("Failed to fetch team details", "error");
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  const handleQuizsetClick = (quizsetId) => {
    navigate(`/team/${teamId}/quizset/${quizsetId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamInfo) {
    return <div>Team not found</div>;
  }


  const handleLeaveTeam = async () => {
    // Mock 
    showSnackbar("You have left the team", "success");
    navigate("/teams");
  
    // API 
    // try {
    //   const response = await TeamService.leaveTeam(teamId);
    //   if (response === "success") {
    //     showSnackbar("You have left the team", "success");
    //     navigate("/teams");
    //   } else {
    //     showSnackbar(response, "error");
    //   }
    // } catch (error) {
    //   console.error("Error leaving team:", error);
    //   showSnackbar("Failed to leave team", "error");
    // }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleLeaveTeam}
        >
          Leave Team
        </button>
      </div>
        <h1 className="text-2xl font-bold mb-4">{teamInfo.name}</h1>
        <p className="text-gray-600 mb-6">{teamInfo.description}</p>

        {/* Tabs for Quizsets and Members */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Quizsets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamInfo.quizsets.map((quizset) => (
              <div
                key={quizset.id}
                className="p-4 border rounded shadow-md bg-white cursor-pointer hover:shadow-lg"
                onClick={() => handleQuizsetClick(quizset.id)}
              >
                <h3 className="text-lg font-bold mb-2">{quizset.name}</h3>
                <p className="text-sm text-gray-500">Best Score: {quizset.bestScore}</p>
                <p className="text-sm text-gray-500">Attempts: {quizset.attempts}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamInfo.members.map((member) => (
              <div
                key={member.id}
                className="p-4 border rounded shadow-md bg-white"
              >
                <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                <p className="text-sm text-gray-500">Score: {member.score}</p>
                <p className="text-sm text-gray-500">Role: {member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
