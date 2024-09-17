import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { acceptFriendRequest, getAllInterest, getMutualFriends, getUserData, sendFriendRequest, unfollowFriend, withdrawRequest } from '../Services/operations/userAPI';
import InterestForm from '../Component/InterestForm';

function UserProfile() {
  const mutualFriends = useSelector((state) => state.friend.mutualFriends);
  const currentUserID = useSelector((state) => state.user?.currentUser?.id);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const params = useParams();
  const { userID } = params;

  useEffect(() => {
    dispatch(getUserData(userID, token))
    dispatch(getMutualFriends(userID, token));
  }, [dispatch, userID]);

  const handleAddFriend = (recieverID) => {
    dispatch(sendFriendRequest(recieverID, token));
  };

  const handleWithDrawRequest = (recieverID) => {
    dispatch(withdrawRequest(recieverID, token));
  };

  const handleAcceptRequest = (senderID) => {
    dispatch(acceptFriendRequest(senderID, token));
  };

  const handleUnfollow = (opponentID) => {
    dispatch(unfollowFriend(opponentID, token));
  }


  console.log("user", user);
  console.log("mutual Friends",);

  return (
    <div className=" flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">

        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between gap-4">
          <div className="flex justify-start items-center gap-4">
            <img
              src={user?.profileImage}
              alt="Profile"
              className="w-16 h-16 md:w-32 md:h-32 rounded-full object-cover"
            />
            <div>
              <h2 className="text-sm md:text-3xl font-bold text-gray-800">{user?.fullName}</h2>
              <p className="text-gray-500">@{user?.username}</p>
            </div>
          </div>
        </div>

        {userID !== currentUserID &&
          <div className='flex flex-row justify-end'>
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
          </div>
        }

        <hr className='mt-2' />
        <div className='text-xl underline text-left'>Interest</div>
        <div className="flex flex-wrap gap-2 mt-2 pl-2">
          {user?.interest?.map((interest, index) => (
            <div
              key={index}
              className={`px-1 py-1 rounded-md `}
            >
              {interest},
            </div>
          ))}
        </div>


        {/* Mutual Connections */}
        {userID !== currentUserID ?
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Mutual Connections</h3>
            {mutualFriends?.length > 0 && <p className="text-gray-500 whitespace-nowrap text-left">{mutualFriends.length} mutual connections.</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {mutualFriends?.length > 0 ? (
                mutualFriends?.map((friend) => (
                  <NavLink to={`/user/${friend?._id}`} key={friend._id} className="flex flex-col items-center">
                    <img
                      src={friend?.profileImage}
                      alt={friend?.username}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <p className="mt-2 text-gray-700">{friend.fullName}</p>
                    <NavLink to={`/user/${friend?._id}`} className="text-gray-500 hover:underline">@{friend.username}</NavLink>
                  </NavLink>
                ))
              ) : (
                <p className="text-gray-500 whitespace-nowrap">No mutual connections yet.</p>
              )}
            </div>
          </div>
          : (
            <>
              <button onClick={() => setShowInterestForm(!showInterestForm)} className='px-2 py-1 bg-blue-400 hover:cursor-pointer rounded-md mt-4' >Add Interest</button>

              {showInterestForm && <InterestForm />}

            </>


          )
        }
      </div>
    </div>
  );
}

export default UserProfile;
