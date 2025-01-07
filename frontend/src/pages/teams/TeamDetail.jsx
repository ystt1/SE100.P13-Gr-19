import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TeamService from "../../data/service/team_service";
import { useSnackbar } from "../../components/NotificationBat";
import QuizStartPage from "../practice/practice";
const TeamDetail = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [quizSet, setQuizSet] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [selectedQuiz,setSelectedQuiz]=useState(false)
  const [role,setRole]=useState("NONE");
  useEffect(() => {
    fetchUserStatus();
    fetchTeamQuizSet();
    fetchTeamUsers();
  }, [teamId]);

  const fetchTeamUsers = async () => {
    try {
      if (!teamId) {
        console.error("teamId is missing");
        return;
      }
      const data = await TeamService.GetAllMember(teamId);
      setUsers(data.data.members || []);
    } catch (error) {
      showSnackbar("Failed to fetch team users", "error");
    }
  };

  const fetchUserStatus=async()=>{
    const data = await TeamService.getStatusOfUser(teamId);
    setRole(data.data.status);
  }

  const fetchTeamQuizSet = async () => {
    try {
      const data = await TeamService.getAllQuizSet(teamId);
      setQuizSet(data.data || []);
    } catch (error) {
      showSnackbar("Failed to fetch quizset", "error");
    }
  };

  const handleQuizsetClick = (quizset) => {
    console.log(quizset);
    setSelectedQuiz(quizset)
    setStartQuiz(true);
  };

  const handleLeaveTeam = async () => {
    try {
      const response = await TeamService.leaveTeam(teamId);
      showSnackbar(response.data);
      navigate("/teams")
    } catch (error) {
      showSnackbar("Failed to remove teams", "error");
    }
  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePraticeCancel = () => {
    setStartQuiz(false);
  }


  if(role!=="MEMBER" && role!=="CREATOR")
  {
    return <div>You don't have permision to join this Page</div>
  }
  return (
    <div className="p-4">
      {!startQuiz ? (<div className="flex">
          <h2></h2>
        <Sidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="flex justify-end">

          {role === "CREATOR" && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => navigate(`/teams/${teamId}/manage`)}
                >
                  Quản lý
                </button>
              )}
              {role!=="CREATOR" && (
                <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleLeaveTeam}
            >
              Leave Team
            </button>
              )}
          </div>

          {/* Danh sách Quizsets */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Quizsets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizSet.map((quiz,index) => (
                <div
                  key={`${index}- ${quiz.id}`}
                  className="p-4 border rounded shadow-md bg-white hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold mb-2">{quiz.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Created: {quiz.createdTime}</p>
                  <p className="text-sm text-gray-500 mb-2">Time Limit: {quiz.timeLimit} min</p>
                  <p className="text-sm text-gray-500 mb-4">Owner: {quiz.creator.name}</p>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleQuizsetClick(quiz)}
                  >
                    Làm bài
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danh sách thành viên */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Members</h2>
            <p className="text-sm text-gray-500 mb-4">
              Total Members: {users.length} <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleModal}
              >
                (View All)
              </span>
            </p>
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                  <h3 className="text-lg font-bold mb-4">Team Members</h3>
                  <ul className="space-y-2">
                    {users.map((member) => (
                      <li key={member.id} className="text-gray-700">
                        {member.name} - Score: {member.score}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>) : (
        <QuizStartPage onCancel={() => handlePraticeCancel()} id={selectedQuiz.id} name={selectedQuiz.name} maxTime={selectedQuiz.timeLimit} />)}
    </div>
  );
};

export default TeamDetail;
