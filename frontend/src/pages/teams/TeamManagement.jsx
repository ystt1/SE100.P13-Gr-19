import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import TeamService from "../../data/service/team_service";
import { useSnackbar } from "../../components/NotificationBat";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaFileExport } from "react-icons/fa";

const mockMembers = [
  { id: 1, name: "Member A", role: "Member", attempts: 3, bestScore: 95 },
  { id: 2, name: "Member B", role: "Admin", attempts: 5, bestScore: 90 },
  { id: 3, name: "Member C", role: "Member", attempts: 2, bestScore: 80 },
];

const mockQuizSets = [
  { id: 1, name: "Quiz 1", maxAttempts: 3 },
  { id: 2, name: "Quiz 2", maxAttempts: 5 },
  { id: 3, name: "Quiz 3", maxAttempts: 2 },
];

const TeamManagement = () => {
  const { teamId } = useParams();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [teamInfo, setTeamInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [quizSets, setQuizSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      // mock data
      setTeamInfo({ id: teamId, name: "Team A", owner: "User1", limit: 10, currentMembers: 5 });
      setMembers(mockMembers);
      setQuizSets(mockQuizSets);
      setIsLoading(false);

      // API 
      // try {
      //   const teamData = await TeamService.getTeamDetail(teamId);
      //   setTeamInfo(teamData.teamInfo);
      //   setMembers(teamData.members);
      //   setQuizSets(teamData.quizSets);
      //   setIsLoading(false);
      // } catch (error) {
      //   console.error("Error fetching team data:", error);
      //   showSnackbar("Failed to load team data", "error");
      // }
    };

    fetchTeamData();
  }, [teamId]);

  const handleRemoveMember = async (memberId) => {
    // Logic xóa thành viên
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
    showSnackbar("Member removed successfully", "success");

    // API 
    // try {
    //   await TeamService.removeMember(teamId, memberId);
    //   setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
    //   showSnackbar("Member removed successfully", "success");
    // } catch (error) {
    //   console.error("Error removing member:", error);
    //   showSnackbar("Failed to remove member", "error");
    // }
  };

  const handleExportResults = async () => {
    // Logic xuất dữ liệu
    showSnackbar("Results exported successfully", "success");

    // API 
    // try {
    //   await TeamService.exportResults(teamId);
    //   showSnackbar("Results exported successfully", "success");
    // } catch (error) {
    //   console.error("Error exporting results:", error);
    //   showSnackbar("Failed to export results", "error");
    // }
  };

  const handleAddQuizSet = () => {
    navigate(`/teams/${teamId}/add-quizset`);
  };

  if (isLoading) return <div>Loading...</div>;


  const handleApproveRequest = async (requestId) => {
    // Mock 
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
    showSnackbar("Request approved", "success");
  
    // API 
    // try {
    //   const response = await TeamService.approveRequest(teamId, requestId);
    //   if (response === "success") {
    //     setRequests((prevRequests) =>
    //       prevRequests.filter((request) => request.id !== requestId)
    //     );
    //     showSnackbar("Request approved", "success");
    //   } else {
    //     showSnackbar(response, "error");
    //   }
    // } catch (error) {
    //   console.error("Error approving request:", error);
    //   showSnackbar("Failed to approve request", "error");
    // }
  };
  
  const handleRejectRequest = async (requestId) => {
    // Mock
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
    showSnackbar("Request rejected", "success");

    // API 
    // try {
    //   const response = await TeamService.rejectRequest(teamId, requestId);
    //   if (response === "success") {
    //     setRequests((prevRequests) =>
    //       prevRequests.filter((request) => request.id !== requestId)
    //     );
    //     showSnackbar("Request rejected", "success");
    //   } else {
    //     showSnackbar(response, "error");
    //   }
    // } catch (error) {
    //   console.error("Error rejecting request:", error);
    //   showSnackbar("Failed to reject request", "error");
    // }
  };


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Team: {teamInfo.name}</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Members</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Attempts</th>
                <th className="border px-4 py-2">Best Score</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="border px-4 py-2">{member.name}</td>
                  <td className="border px-4 py-2">{member.role}</td>
                  <td className="border px-4 py-2">{member.attempts}</td>
                  <td className="border px-4 py-2">{member.bestScore}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-500 hover:underline"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
            
       

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Quiz Sets</h2>
          <button
            onClick={handleAddQuizSet}
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
          >
            Add Quiz Set
          </button>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Max Attempts</th>
              </tr>
            </thead>
            <tbody>
              {quizSets.map((quiz) => (
                <tr key={quiz.id}>
                  <td className="border px-4 py-2">{quiz.name}</td>
                  <td className="border px-4 py-2">{quiz.maxAttempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb-6">
          <button
            onClick={handleExportResults}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            <FaFileExport className="inline mr-2" /> Export Results
          </button>
        </section>
      </div>
    </div>
  );
};

export default TeamManagement;
