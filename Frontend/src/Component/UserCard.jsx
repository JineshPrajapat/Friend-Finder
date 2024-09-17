import React from "react";
import { NavLink } from "react-router-dom";

function UserCard({ user, currentUserID, handleAddFriend, handleWithDrawRequest, handleAcceptRequest, handleUnfollow }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
      <img
        src={user?.profileImage}
        alt="User"
        className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-2"
      />
      <span className="font-medium">{user.fullName}</span>
      <div className="flex flex-row gap-3">
        {user?.friendRequestRecieved?.includes(currentUserID) ? (
          <div
            className="bg-red-500 text-white text-xs md:text-sm px-2 flex items-center py-1 rounded-lg mt-2 hover:bg-red-600 cursor-pointer"
            onClick={() => handleWithDrawRequest(user._id)}
          >
            Cancel Request
          </div>
        ) : user?.freindRequestSent?.includes(currentUserID) ? (
          <div
            className="bg-green-500 text-white text-xs md:text-sm px-2 flex items-center py-1 rounded-lg mt-2 hover:bg-green-600 cursor-pointer"
            onClick={() => handleAcceptRequest(user._id)}
          >
            Confirm Request
          </div>
        ) : user?.friends?.includes(currentUserID) ? (
          <div
            className="bg-slate-400 text-white text-xs md:text-sm px-2 flex items-center py-1 rounded-lg mt-2 hover:bg-slate-500 cursor-pointer"
            onClick={() => handleUnfollow(user._id)}
          >
            Unfollow
          </div>
        ) : (
          <div
            className="bg-blue-500 text-white text-xs md:text-sm px-2 flex items-center py-1 rounded-lg mt-2 hover:bg-blue-600 cursor-pointer"
            onClick={() => handleAddFriend(user._id)}
          >
            Add Friend
          </div>
        )}
        <NavLink
          to={`/user/${user._id}`}
          className="bg-gray-500 text-white text-xs  md:text-sm px-2 flex items-center py-1 rounded-lg mt-2 hover:bg-gray-600 cursor-pointer"
        >
          View Profile
        </NavLink>
      </div>
    </div>
  );
}

export default UserCard;
