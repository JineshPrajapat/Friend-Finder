import { apiConnector } from "../apiConnector";
import { userEndPoints } from "../api";
import { setAllInterest, setAllUsers, setFriends, setMutualFriends, setRequestRecieved, setRequestSent } from "../../Reducer/Slice/FriendSlice";
import { setLoading, setRecommendation, setUserDetails } from "../../Reducer/Slice/userSlice";
import { toast } from "react-toastify";

const { GET_FRIEND_LIST_API,
    GET_ALL_USERS_API,
    PUT_FRIEND_REQUEST_API,
    GET_REQUEST_SENDED_USER_API,
    GET_FRIEND_REQUEST_RECIEVED_API,
    PUT_FRIEND_REQUEST_ACCEPT_API,
    PUT_FRIEND_REQUEST_REJECT_API,
    PUT_FRIEND_REQUEST_WITHDRAW_API,
    PUT_UNFOLLOW_API,
    GET_USER_DETAILS_API,
    SEARCH_USER_API,
    GET_MUTUAL_FRIEND_API,
    PUT_ADD_INTEREST_API,
    GET_ALL_INTEREST_API,
    GET_RECOMMENDATION_API
} = userEndPoints;

const token = localStorage.getItem("token");

export function getUserData(userID, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            dispatch(setUserDetails(null));
            const response = await apiConnector({
                method: "GET",
                url: GET_USER_DETAILS_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { userID: userID }
            });

            if (response.status === 200 && response.data.success) {
                const result = response.data.user;
                dispatch(setUserDetails(result));
                console.log("result", result);
            }

        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
            toast.error("Network error, try again")
        }
        dispatch(setLoading(false));
    }
}

export function searchUsers(query) {
    return async (dispatch) => {
        try {
            const response = await apiConnector({
                method: "GET",
                url: `${SEARCH_USER_API}?query=${query}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                dispatch(setAllUsers(response?.data.allUsers));
            }
        }
        catch (err) {
            console.error("Error searching users:", err);
        }
    }
}

export function getAllFriend(token) {
    return async (dispatch) => {
        try {
            const response = await apiConnector({
                method: "GET",
                url: GET_FRIEND_LIST_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // console.log("response", response);
            if (response.status === 200 && response.data.success) {
                const result = response.data.friends;
                dispatch(setFriends(result));
                // console.log("result", result);
            }
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
        }
    }
};

export function getAllUser(token) {
    return async (dispatch) => {
        try {
            const response = await apiConnector({
                method: "GET",
                url: GET_ALL_USERS_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data.success) {
                let result = response.data.allUsers;
                dispatch(setAllUsers(result));
            }
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
        }
    }
}

export function sendFriendRequest(recieverID, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log("send Friend Request", recieverID);
            const response = await apiConnector({
                method: "PUT",
                url: PUT_FRIEND_REQUEST_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    recieverID: recieverID,
                },
            });

            if (response.status === 200 && response.data.success) {
                console.log("requeste added");
                getAllUser(token);
                toast.success("Friend request sent.")
            }

            console.log("sendFRiendRequest response", response)
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
            toast.error("Network error, try again");

        }
    }
}

export function getAllRequestSent(token) {
    return async (dispatch) => {
        try {
            const response = await apiConnector({
                method: "GET",
                url: GET_REQUEST_SENDED_USER_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data.success) {
                let result = response.data.requestSent;
                dispatch(setRequestSent(result));
            }
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
        }
    }
}

export function getAllRequestRecieved(token) {
    return async (dispatch) => {
        try {
            const response = await apiConnector({
                method: "GET",
                url: GET_FRIEND_REQUEST_RECIEVED_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data.success) {
                let result = response.data.requestRecieved;
                dispatch(setRequestRecieved(result));
            }
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
            toast.error("Network error, try again");
        }
    }
}

export function acceptFriendRequest(senderID, token) {
    return async (dispatch) => {
        try {
            console.log("saccept friend Request", senderID);
            const response = await apiConnector({
                method: "PUT",
                url: PUT_FRIEND_REQUEST_ACCEPT_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    senderID: senderID,
                },
            });

            if (response.status === 200 && response.data.success) {
                console.log("friend Request accepted");
                toast.success("Friend request accepted.");
                getAllUser(token);
                getAllRequestRecieved(token);
            }
            console.log("accepct Friend Request response", response)
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
            toast.error("Network error, try again");
        }
    }
}

export function rejectFriendRequest(senderID, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log("reject friend Request", senderID);
            const response = await apiConnector({
                method: "PUT",
                url: PUT_FRIEND_REQUEST_REJECT_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    senderID: senderID,
                },
            });

            if (response.status === 200 && response.data.success) {
                console.log("reject friend Request successfully");
                toast.success("Request Rejected");
                getAllUser(token);
                getAllRequestRecieved(token);
            }
            console.log("accepct Friend Request response", response)
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
            toast.error("Network error, try again");
        }
        dispatch(setLoading(true));
    }
}

export function withdrawRequest(recieverID, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log("withdraw Friend Request", recieverID);
            const response = await apiConnector({
                method: "PUT",
                url: PUT_FRIEND_REQUEST_WITHDRAW_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    recieverID: recieverID,
                },
            });

            if (response.status === 200 && response.data.success) {
                // let result = response.data.allUsers;
                console.log("withdran request made");
                getAllRequestSent(token);
                getAllFriend(token);
                toast.success("Request Withdrawn.")
            }
            console.log("withdraw Friend Request response", response)
        }
        catch (err) {
            toast.error("Network error, try again");
            console.log("Network error or unknown error", err.message);
        }
        dispatch(setLoading(false));
    }
}

export function unfollowFriend(opponentID, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log("unfollow friend", opponentID);
            const response = await apiConnector({
                method: "PUT",
                url: PUT_UNFOLLOW_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    opponentID: opponentID,
                },
            });
            if (response.status === 200 && response.data.success) {
                // console.log("Unfollowed successfully");
                toast.success("Unfollowed successfully");
            }
            // console.log("unfollow Friend Request response", response)
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
            toast.error("Network error, try again");

        }
        dispatch(setLoading(false));
    }
}

export function getMutualFriends(opponentID, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            dispatch(setMutualFriends(null));
            const response = await apiConnector({
                method: "GET",
                url: GET_MUTUAL_FRIEND_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { opponentID: opponentID }
            });
            if (response.status === 200 && response.data.success) {
                let result = response.data.mutualFriends
                dispatch(setMutualFriends(result));
                console.log("mutual friend successfully");
            }
            // console.log("mutual friend response", response)
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);

        }
        dispatch(setLoading(false));
    }
}


export function updateInterest(interests, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log("update interest", interests);
            const response = await apiConnector({
                method: "PUT",
                url: PUT_ADD_INTEREST_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                bodyData: { interests }
            });

            

            if (response.status === 200 && response.data.success) {
                toast.success("Interests updated successfully")
                console.log("Interests updated successfully");
            }
            
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
            toast.error("Network error, try again.")

        }
        dispatch(setLoading(false));
    }
}

export function getAllInterest(token) {
    // console.log("function invoked");
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            dispatch(setAllInterest(null));
            const response = await apiConnector({
                method: "GET",
                url: GET_ALL_INTEREST_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // console.log("response of interes", response)
            if (response.status === 200 && response.data.success) {
                let result = response.data.interests;
                dispatch(setAllInterest(result));
                // console.log("interest fetched",result)
            }
        }
        catch (err) {
            console.log("Network error or unknown error", err.message);
            toast.error("Network error, try again");
        }
        dispatch(setLoading(false));
    }
}

export function getRecommendation(token){
    // console.log("function recommendation invoked");
    return async (dispatch) => {
        // dispatch(setLoading(true));
        try {
            const response = await apiConnector({
                method: "GET",
                url: GET_RECOMMENDATION_API,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // console.log("response of recommendation", response)
            if (response.status === 200 && response.data.success) {
                let result = response.data.recommendation;
                dispatch(setRecommendation(result));
                // console.log("recommendation fetched",result)
            }
        }
        catch (err) {
            console.log("Network error or unknown error", err);
            toast.error("Network error, try again");
        }
        // dispatch(setLoading(false));
    }
}
