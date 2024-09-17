import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, getRecommendation, sendFriendRequest, unfollowFriend, withdrawRequest } from "../Services/operations/userAPI";
import UserCard from "../Component/UserCard";

function Recommendation() {
  const recommendation = useSelector((state) => state.user.recommendation);
  const currentUserID = useSelector((state) => state.user?.currentUser?.id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendation(token));
  }, []);

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

  console.log("getRecommendation", recommendation)

  return (
    <section className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
      <h2 className="text-lg font-semibold mb-4">Friend Recommendations</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {recommendation?.length > 0 ? (
          recommendation?.map((user, index) => {
            console.log("user", user)
            return (
              <UserCard
                key={index}
                user={user}
                currentUserID={currentUserID}
                handleAddFriend={handleAddFriend}
                handleWithDrawRequest={handleWithDrawRequest}
                handleAcceptRequest={handleAcceptRequest}
                handleUnfollow={handleUnfollow}
              />
            )
          })

        ) : (
          <div className="flex items-center justify-center">
            <p>No Recommendation available.</p>
          </div>
        )}
      </ul>
    </section>
  );
}

export default Recommendation;
