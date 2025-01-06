import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import TeamService from "../../data/service/team_service";
import { useSnackbar } from "../../components/NotificationBat";
import { FaCheck, FaTimes } from "react-icons/fa";

const mockJoinRequests = [
  { id: 1, teamName: "Team A", requester: "User1", status: "Pending" },
  { id: 2, teamName: "Team B", requester: "User2", status: "Pending" },
  { id: 3, teamName: "Team C", requester: "User3", status: "Pending" },
];

const TeamJoinRequest = () => {
  const { showSnackbar } = useSnackbar();
  const [joinRequests, setJoinRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJoinRequests = async () => {
      //mock data
      setJoinRequests(mockJoinRequests);
      setIsLoading(false);

      // API 
      // try {
      //   const requests = await TeamService.getJoinRequests();
      //   setJoinRequests(requests);
      //   setIsLoading(false);
      // } catch (error) {
      //   console.error("Error fetching join requests:", error);
      //   showSnackbar("Failed to load join requests", "error");
      // }
    };

    fetchJoinRequests();
  }, []);

  const handleApproveRequest = async (requestId) => {
    // Logic phê duyệt yêu cầu
    setJoinRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: "Approved" } : request
      )
    );
    showSnackbar("Request approved successfully", "success");

    // API
    // try {
    //   await TeamService.approveJoinRequest(requestId);
    //   setJoinRequests((prevRequests) =>
    //     prevRequests.map((request) =>
    //       request.id === requestId ? { ...request, status: "Approved" } : request
    //     )
    //   );
    //   showSnackbar("Request approved successfully", "success");
    // } catch (error) {
    //   console.error("Error approving join request:", error);
    //   showSnackbar("Failed to approve request", "error");
    // }
  };

  const handleDenyRequest = async (requestId) => {
    // Logic từ chối yêu cầu
    setJoinRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: "Denied" } : request
      )
    );
    showSnackbar("Request denied successfully", "success");

    // API
    // try {
    //   await TeamService.denyJoinRequest(requestId);
    //   setJoinRequests((prevRequests) =>
    //     prevRequests.map((request) =>
    //       request.id === requestId ? { ...request, status: "Denied" } : request
    //     )
    //   );
    //   showSnackbar("Request denied successfully", "success");
    // } catch (error) {
    //   console.error("Error denying join request:", error);
    //   showSnackbar("Failed to deny request", "error");
    // }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-bold mb-4">Team Join Requests</h1>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Team Name</th>
              <th className="border px-4 py-2">Requester</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {joinRequests.map((request) => (
              <tr key={request.id}>
                <td className="border px-4 py-2">{request.teamName}</td>
                <td className="border px-4 py-2">{request.requester}</td>
                <td className="border px-4 py-2">{request.status}</td>
                <td className="border px-4 py-2 text-center">
                  {request.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApproveRequest(request.id)}
                        className="text-green-500 hover:underline mx-2"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleDenyRequest(request.id)}
                        className="text-red-500 hover:underline mx-2"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamJoinRequest;
