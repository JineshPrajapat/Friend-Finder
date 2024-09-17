import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../Reducer/Slice/FriendSlice';
import { getAllFriend, unfollowFriend } from '../Services/operations/userAPI';
import { NavLink, useLocation } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";


function Friend() {
    const friends = useSelector((state) => state.friend.friends);
    const token = useSelector((state) => state.user.token);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFriend(token));
    }, [dispatch]);

    const handleUnfollow = (opponentID) => {
        dispatch(unfollowFriend(opponentID, token));
    }

    const isHomePage = location.pathname === "/";
    const displayedFriends = isHomePage ? friends.slice(0, 10) : friends;

    console.log(friends);

    return (
        <section className="bg-white md:p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Your Friends</h2>
            <ul className={`space-y-4 p-1 ${isHomePage ? "flex flex-col overflow-hidden  overflow-y-auto h-[40vh]" : ""}`}>
                {displayedFriends.length > 0 ? displayedFriends.map((user, index) => {
                    return (
                        <li
                            to={`/user/${user._id}`} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                            <NavLink
                                to={`/user/${user._id}`} className='flex gap-2 items-center'>
                                <div className='w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-black'>
                                    <img className='w-full h-full rounded-full' src={user.profileImage} alt={"John Doe"} />
                                </div>
                                <span className="font-medium text-xs md:text-xl">{user.fullName}</span>
                            </NavLink>
                            <button className="text-red-500 text-sm  px-2 py-1 border duration-500 bg-white rounded-md hover:bg-red-500 hover:text-white"
                                onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                        </li>
                    )
                }) : (
                    <p>No friends exist.<br /><br /> Discover and create Friends!</p>
                )}
                {displayedFriends.length > 0 && isHomePage && (
                    <div className="flex items-center justify-center">
                        <NavLink
                            to="/Friends"
                            className="bg-gray-100 hover:bg-gray-200 duration-500 h-full w-full p-4 rounded-lg text-black px-10 py-2 hover:bg-gary-400 flex flex-col items-center justify-center"
                        >
                            <FaArrowCircleRight className="text-blue-500 text-4xl " />
                            <p className=" whitespace-nowrap">Discover More Users</p>
                        </NavLink>
                    </div>
                )}
            </ul>
        </section>
    );
}

export default Friend;
