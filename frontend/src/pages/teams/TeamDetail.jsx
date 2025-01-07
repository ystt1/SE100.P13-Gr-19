import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TeamService from "../../data/service/team_service";
import { useSnackbar } from "../../components/NotificationBat";

const TeamDetail = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [quizSet, setQuizSet] = useState([]);

  useEffect(() => {
    console.log(teamId);
    fetchTeamQuizSet();
  }, [teamId]);

  const fetchTeamUsers = async () => {
    try {
      const data = await TeamService.GetAllMember(teamId);
      setUsers(data.data.members || []);
    } catch (error) {
      showSnackbar("Failed to fetch team users", "error");
    }
  };

  const fetchTeamQuizSet = async () => {
    try {
      const data = await TeamService.getAllQuizSet(teamId);
      setQuizSet(data.data || []);
    } catch (error) {
      showSnackbar("Failed to fetch quizset", "error");
    }
  };

  const handleQuizsetClick = (quizsetId) => {
    navigate(`/team/${teamId}/quizset/${quizsetId}`);
  };

  const handleLeaveTeam = () => {
    showSnackbar("You have left the team", "success");
    navigate("/teams");
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

        {/* Danh sách Quizsets */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Quizsets</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Date Created</th>
                <th className="border border-gray-300 px-4 py-2">Time Limit</th>
                <th className="border border-gray-300 px-4 py-2">Owner</th>
                <th className="border border-gray-300 px-4 py-2">Questions</th>
              </tr>
            </thead>
            <tbody>
              {quizSet.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleQuizsetClick(quiz.id)}
                >
                  <td className="border border-gray-300 px-4 py-2">{quiz.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{quiz.dateCreated}</td>
                  <td className="border border-gray-300 px-4 py-2">{quiz.timeLimit} min</td>
                  <td className="border border-gray-300 px-4 py-2">{quiz.owner}</td>
                  <td className="border border-gray-300 px-4 py-2">{quiz.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Danh sách thành viên */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((member) => (
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
