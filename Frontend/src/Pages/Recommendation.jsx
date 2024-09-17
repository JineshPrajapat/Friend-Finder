import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMutualFriends } from "../Services/operations/userAPI";

function Recommendation() {
  const mutualFriends = useSelector((state) => state.friend.mutualFriends);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMutualFriends(token));
  }, [dispatch]);

  console.log("mutual friends", mutualFriends)

  return (
    <section className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
      <h2 className="text-lg font-semibold mb-4">Friend Recommendations</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* List of recommended friends */}
        <li className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
          <img
            src="https://via.placeholder.com/100"
            alt="Friend"
            className="w-20 h-20 rounded-full mb-2"
          />
          <span className="font-medium">Jane Smith</span>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-2 hover:bg-blue-600">
            Add Friend
          </button>
        </li>
        {/* More recommendations can be dynamically mapped here */}
      </ul>
    </section>
  );
}

export default Recommendation;
