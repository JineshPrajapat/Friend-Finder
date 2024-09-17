import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendRequest, getAllUser, sendFriendRequest, unfollowFriend, withdrawRequest } from "../Services/operations/userAPI";
import UserCard from "../Component/UserCard";
import { NavLink, useLocation } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

function AllUsers() {
    const allUser = useSelector((state) => state.friend.allUsers);
    const currentUserID = useSelector((state) => state.user?.currentUser?.id);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getAllUser(token));
    }, [dispatch]);

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

    const isHomePage = location.pathname === "/";
    const displayedUsers = isHomePage ? allUser.slice(0, 10) : allUser;
    console.log("displayedUsers",displayedUsers)

    return (
        <section className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">All Users</h2>
            <div className={` ${isHomePage ? "flex flex-row gap-3 overflow-hidden overflow-x-auto whitespace-nowrap" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}`} >
                {displayedUsers &&
                    displayedUsers?.map((user, index) => (
                        <UserCard
                            key={index}
                            user={user}
                            currentUserID={currentUserID}
                            handleAddFriend={handleAddFriend}
                            handleWithDrawRequest={handleWithDrawRequest}
                            handleAcceptRequest={handleAcceptRequest}
                            handleUnfollow={handleUnfollow}
                        />
                    ))}

                {isHomePage && (
                    <div className="flex items-center justify-center">
                        <NavLink
                            to="/allUser"
                            className="bg-gray-100 hover:bg-gray-200 duration-500 h-full w-full p-4 rounded-lg text-black px-10 py-2 hover:bg-gary-400 flex flex-col items-center justify-center"
                        >
                            <FaArrowCircleRight className="text-blue-500 text-4xl " />
                            <p className=" whitespace-nowrap">Discover More Users</p>
                        </NavLink>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AllUsers;
