import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, getAllRequestRecieved, rejectFriendRequest } from '../Services/operations/userAPI';
import { NavLink } from 'react-router-dom';

function RequestReceived() {
  const requestReceived = useSelector((state) => state.friend.requestRecieved);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRequestRecieved(token));
  }, [dispatch]);

  const handleAcceptRequest = (senderID) => {
    dispatch(acceptFriendRequest(senderID, token));
  }

  const handleRejectRequest = (senderID) => {
    dispatch(rejectFriendRequest(senderID, token));
  }

  console.log("request recieved", requestReceived);

  return (
    <section className="bg-white md:p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Requests Received</h2>

      <ul className="space-y-4 p-1">
        {requestReceived && requestReceived.map((user, index) => {
          return (
            <li className="flex justify-between items-center bg-gray-100 p-2 rounded-lg text-xs">
              <NavLink
                to={`/user/${user._id}`} className='flex flex-row gap-2 items-center'>
                <img
                  src={user.profileImage}
                  alt="User"
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                />
                <span className="font-medium text-xs md:text-xl">{user.fullName}</span>
              </NavLink>
              <div>
                <button className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-600"
                  onClick={() => handleAcceptRequest(user._id)}>
                  Accept
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  onClick={() => handleRejectRequest(user._id)}>
                  Reject
                </button>
              </div>
            </li>
          )
        })}

        {!requestReceived.length>0 && <p>No request recieved</p>}
      </ul>

    </section>
  );
}

export default RequestReceived;
