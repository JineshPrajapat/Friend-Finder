export const BASE_URL = process.env.REACT_APP_BASE_URL
// export const BASE_URL = "http://localhost:5000/api/v1"

// AUTH ENDPOINTS
export const authEndPoints = {
    SIGNUP_API : BASE_URL + "/auth/signUp",
    LOGIN_API : BASE_URL + "/auth/logIn"
}

// USER ENDPOINTS
export const userEndPoints = {
    SEARCH_USER_API : BASE_URL + "/user/search",
    GET_ALL_USERS_API : BASE_URL + "/user/allUsers",
    GET_USER_DETAILS_API : BASE_URL + "/user/userDetails",
    GET_FRIEND_LIST_API : BASE_URL + "/user/friends",
    GET_FRIEND_REQUEST_RECIEVED_API : BASE_URL + "/user/requestRecieved",
    GET_REQUEST_SENDED_USER_API : BASE_URL + "/user/requestSended",

    PUT_FRIEND_REQUEST_API : BASE_URL + "/user/friendRequestSent",
    PUT_FRIEND_REQUEST_WITHDRAW_API : BASE_URL + "/user/withdrawFriendRequest",
    PUT_FRIEND_REQUEST_ACCEPT_API : BASE_URL + "/user/acceptFriendRequest",
    PUT_FRIEND_REQUEST_REJECT_API : BASE_URL + "/user/rejectFriendRequest",
    PUT_UNFOLLOW_API : BASE_URL + "/user/unfollow",
    PUT_ADD_INTEREST_API : BASE_URL +"/user/updateInterest",

    GET_MUTUAL_FRIEND_API : BASE_URL + "/user/mutualFriends",
    GET_ALL_INTEREST_API : BASE_URL + "/user/getAllInterest",
    GET_RECOMMENDATION_API : BASE_URL + "/user/getRecommendation",

}