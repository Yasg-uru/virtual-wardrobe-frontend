import React from "react";
import { useAppSelector } from "@/redux/hook";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.userInfo);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 p-6">
      <div className="bg-gray-200 dark:bg-gray-800 shadow-2xl rounded-lg max-w-md w-full p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-green-400/50 dark:hover:shadow-purple-500/50">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-green-400 dark:border-purple-500 shadow-lg transition-transform duration-300 hover:rotate-6"
              src={
                user.profileUrl ||
                "https://via.placeholder.com/150?text=No+Image"
              }
              alt={user.username}
            />
            <div className="absolute inset-0 rounded-full bg-green-400 dark:bg-purple-500 opacity-20 blur-lg"></div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {user.username}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center">
            <span className="text-green-400 dark:text-purple-400 font-semibold mr-2">Roles:</span>
            <p className="text-gray-700 dark:text-gray-300">{user.roles.join(", ")}</p>
          </div>
          <div className="flex items-center">
            <span className="text-green-400 dark:text-purple-400 font-semibold mr-2">
              Account Status:
            </span>
            <p className="text-gray-700 dark:text-gray-300">
              {user.isActive ? "Active" : "Inactive"}
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-green-400 dark:text-purple-400 font-semibold mr-2">
              Verified:
            </span>
            <p className="text-gray-700 dark:text-gray-300">{user.isVerified ? "Yes" : "No"}</p>
          </div>
          <div className="flex items-center">
            <span className="text-green-400 dark:text-purple-400 font-semibold mr-2">
              Last Login:
            </span>
            <p className="text-gray-700 dark:text-gray-300">
              {new Date(user.lastLogin).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-green-400 dark:text-purple-400 font-semibold mr-2">
              Account Created:
            </span>
            <p className="text-gray-700 dark:text-gray-300">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-green-400 dark:text-purple-400 font-semibold mr-2">
              Last Updated:
            </span>
            <p className="text-gray-700 dark:text-gray-300">
              {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* <div className="mt-10 flex justify-center">
          <button className="bg-gradient-to-r from-green-600 to-teal-600 dark:from-purple-600 dark:to-pink-600 text-gray-100 dark:text-white font-bold py-3 px-6 rounded-md shadow-lg hover:shadow-teal-400/50 dark:hover:shadow-pink-500/50 transition transform duration-300 hover:scale-110">
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
