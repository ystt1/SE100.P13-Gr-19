import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import TeamService from "../../data/service/team_service";
import { useSnackbar } from "../../components/NotificationBat";
import { useParams } from "react-router-dom";
import { FaBell, FaPlus, FaTrash } from "react-icons/fa";
import { QuizSetCard } from "../QuizSet/QuizsetCard";
import AddQuizSetModal from "./component/add_quizset_to_team_model";
import { useNavigate } from "react-router-dom";
const TeamManagement = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [quizSet, setQuizSet] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [role, setRole] = useState("NONE");
  const [selectedQuizSet,setSelectedQuizSet]=useState();
  const [report,setReport]=useState([]);
  const fetchJoinRequests = async () => {
    try {
      if (!teamId) {
        console.error("teamId is missing");
        return;
      }
      const data = await TeamService.getJoinRequest(1, 5, "", "", "", "PENDING", teamId);
      setRequests(data.joinRequests || []);
    } catch (error) {
      showSnackbar("Failed to fetch join requests", "error");
    }
  };

  const fetchTeamUsers = async () => {
    try {
      if (!teamId) {
        console.error("teamId is missing");
        return;
      }
      const data = await TeamService.GetAllMember(teamId);
      console.log(data);

      setUsers(data.data.members || []);
    } catch (error) {
      showSnackbar("Failed to fetch team users", "error");
    }
  };

  const fetchTeamQuizSet = async () => {
    try {
      if (!teamId) {
        console.error("teamId is missing");
        return;
      }
      const data = await TeamService.getAllQuizSet(teamId);
      setQuizSet(data.data || []);
    } catch (error) {
      showSnackbar("Failed to fetch quizset", "error");
    }
  };
  const fetchUserStatus = async () => {
    const data = await TeamService.getStatusOfUser(teamId);
    setRole(data.data.status);
  }
  const fetchReport=async(quizset)=>{
    console.log(quizset.id);
    const data=await TeamService.getReport(teamId,quizset.id,)
    console.log(data.data.listResult);
    
    
    setReport(data.data.listResult);
    
  }

  useEffect(() => {
    if (teamId) {
      fetchUserStatus();
      fetchTeamUsers();
      fetchJoinRequests();
      fetchTeamQuizSet();


    }
  }, [teamId]);

  const handleAccept = async (request) => {
    try {
      var response = await TeamService.ChangeRequestStatus(request.id, "ACCEPTED");
      console.log("accep" + response)
      showSnackbar("Request accepted successfully", "success");
      fetchJoinRequests();
      fetchTeamUsers();
    } catch (error) {
      showSnackbar("Failed to accept request", "error");
    }
  };

  const handleReject = async (request) => {
    try {
      var response = await TeamService.ChangeRequestStatus(request.id, "REJECTED");
      console.log("accep" + response)
      showSnackbar("Request rejected successfully", "success");
      fetchJoinRequests();
      fetchTeamUsers();
    } catch (error) {
      showSnackbar("Failed to rejected request", "error");
    }
  };

  const handleKickUser = async (userId) => {
    try {
      const response = await TeamService.removeMember(teamId, userId);
      showSnackbar(response.data);
      fetchTeamUsers();
    } catch (error) {
      showSnackbar("Failed to remove user", "error");
    }
  };

  const handleToggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const handleAddQuizSet = () => {
    setShowAddModal(!showAddModal);
  };

  const handleRemoveQuizSet = async (quizSetId) => {
    try {
      const response = await TeamService.removeQuizSet(teamId, quizSetId);
      showSnackbar(response.data);
      fetchTeamQuizSet();
    } catch (error) {
      showSnackbar("Failed to remove QuizSet", "error");
    }
  };

  const handleDeleteTeam = async () => {
    try {
      const response = await TeamService.removeTeam(teamId);
      showSnackbar(response.data);
      navigate("/teams")
    } catch (error) {
      showSnackbar("Failed to remove teams", "error");
    }
  };
  if (role !== "CREATOR") {
    return <div>You don't have permision to join this Page</div>
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Manage Team: {teamId}</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleToggleNotification}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none shadow-md"
            >
              <FaBell className="mr-2" />
              {requests.length > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {requests.length}
                </span>
              )}
            </button>
          </div>


          <div className="mb-4">
            <button
              onClick={() => navigate("/teams")}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded shadow"
            >
              Back to Teams
            </button>
          </div>


          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow focus:outline-none"
          >
            <FaTrash className="mr-2" />
            Delete Team
          </button>
        </div>

        {isNotificationOpen && (
          <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-300 shadow-lg rounded-lg">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Join Requests</h2>
              <ul>
                {requests.map((request) => (
                  <li
                    key={request.id}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div>
                      <p className="font-bold">{request.user.name}</p>
                      <p className="text-gray-500 text-sm">{request.status}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(request)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}




        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Team Members</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-1">Score</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-1">{user.score}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleKickUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Kick
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Team Quiz Sets</h2>
          <button
            onClick={handleAddQuizSet}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow focus:outline-none mb-4"
          >
            <FaPlus className="mr-2" /> Add Quiz Set
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {quizSet.map((quiz, index) => (
              <QuizSetCard
                key={`${quiz.id}-${index}`}
                name={quiz.name}
                description={quiz.description}
                questionCount={quiz.totalQuestion}
                topic="General"
                createdTime={new Date(quiz.createdTime).toLocaleDateString()}
                creator={quiz.creator.name}
                isSaved={quiz.isBookmarked}
                canDelete={true}
                onDelete={() => handleRemoveQuizSet(quiz.id)}
                isTeam={true}
                onClick={() => {
                  setSelectedQuizSet(quiz)
                  setShowReportModal(true);
                  fetchReport(quiz)
                  // navigate(
                  //   `/team/${teamId}/history/${quiz.id}`)
                }}
              />
            ))}
          </div>
        </div>

        {showAddModal && (
          <AddQuizSetModal
            teamId={teamId}
            onClose={() => {
              setShowAddModal(false);
              fetchTeamQuizSet();
            }}
          />
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this team?</h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTeam}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}



{showReportModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative animate-slide-in">
      {/* Icon close */}
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
        onClick={() => setShowReportModal(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Title */}
      <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
        Report of 
      </h3>

      {/* Members list */}
      <ul className="space-y-3">
        {report.map((member,index) => (
          <li
            key={index}
            className="text-gray-700 flex justify-between items-center"
          >
            <span>{member.user.name}</span>
            <span className="text-sm text-gray-500">
              TrueAns: {member.numberOfCorrectAnswers} - FalseAns: {member.numberOfWrongAnswers}
            </span>
          </li>
        ))}
      </ul>

      {/* Close button */}
      <button
        className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        onClick={() => setShowReportModal(false)}
      >
        Close
      </button>
      <button
        className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        onClick={() => { navigate(
             `/team/${teamId}/history/${selectedQuizSet.id}`)}}
      >
        GetHistory
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default TeamManagement;
