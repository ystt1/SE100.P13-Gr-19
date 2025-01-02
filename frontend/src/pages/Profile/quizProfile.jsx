import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaUserEdit } from "react-icons/fa";
import avatar from "../../images/avatar.png";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  // Dữ liệu mẫu ban đầu
  const sampleUser = {
    id: 3,
    name: "Trung",
    email: "huynhtrung1904@gmail.com",
    phone: "0123456789",
    created_at: "2025-01-03T02:50:50.131+00:00",
  };

  const [user, setUser] = useState(sampleUser);

  // Fetch API để lấy thông tin user
  /*
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("API_ENDPOINT/users/3"); // Đổi 3 thành id phù hợp
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);
  */

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <Sidebar className="fixed top-0 left-0 w-72 h-full bg-white shadow-md z-50" />
      <div className="ml-72 bg-white p-8 shadow-xl rounded-xl max-w-2xl w-full">
        <div className="flex items-center mb-8">
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500 mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-lg text-gray-500">@{user.name.toLowerCase()}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center text-gray-700 text-lg">
            <FaEnvelope className="mr-4 text-blue-500" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center text-gray-700 text-lg">
            <FaPhone className="mr-4 text-green-500" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center text-gray-700 text-lg">
            <span className="font-medium">Name:</span>
            <span className="ml-3">{user.name}</span>
          </div>
          <div className="flex items-center text-gray-700 text-lg">
            <span className="font-medium">Created At:</span>
            <span className="ml-3">
              {new Date(user.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        <button
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center text-lg"
          onClick={() =>
            alert("Chức năng chỉnh sửa profile chưa được thực hiện!")
          }
        >
          <FaUserEdit className="mr-3" /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
