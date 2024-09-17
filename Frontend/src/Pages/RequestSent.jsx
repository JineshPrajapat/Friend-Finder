import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRequestSent, withdrawRequest } from '../Services/operations/userAPI';
import { NavLink } from 'react-router-dom';
import PreLoader from '../Component/PreLoader';

function RequestSent() {
  const requestSent = useSelector((state) => state.friend.requestSent);
  const isLoading = useSelector((state) => state.user.loading);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRequestSent(token));
  }, [dispatch]);

  const handleWithDrawRequest = (recieverID) => {
    dispatch(withdrawRequest(recieverID, token));
  }

  console.log("request sent", requestSent)

  return (
    <section className="bg-white md:p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Requests Sent</h2>

      <ul className="space-y-4 p-1">
        {isLoading ? <PreLoader /> : (
          <>
            {requestSent?.length > 0 && requestSent?.map((user, index) => {
              return (
                <li className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                  <NavLink
                    to={`/user/${user._id}`} className='flex flex-row gap-2 items-center'>
                    <img
                      src={user.profileImage}
                      alt="User"
                      className=" w-8 h-8 md:w-12 md:h-12 rounded-full"
                    />
                    <span className="font-medium text-xs md:text-xl">{user.fullName}</span>
                  </NavLink>
                  <button className="text-sm text-gray-500 border px-2 py-1 rounded-md duration-500 bg-white hover:bg-red-600 hover:text-white"
                    onClick={() => handleWithDrawRequest(user._id)}>
                    withdraw
                  </button>
                </li>
              )
            })}
            {!requestSent?.length > 0 && <p>No request sent.</p>}
          </>
        )}

      </ul>
    </section>
  );
}

export default RequestSent;
