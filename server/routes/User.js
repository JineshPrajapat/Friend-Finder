const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const { friendRequest,
    rejectFriendRequest,
    acceptFriendRequest,
    withdrawRequest,
    unfollow,
    allUsers,
    friends,
    requestRecieved,
    requestSended,
    mutualFriends,
    userDetails,
    searchUser,
    updateInterest,
    getAllInterest,
    getRecommendation } = require("../controllers/User");

router.get("/search", auth, searchUser);
router.get('/userDetails', auth,userDetails)
router.get("/allUsers", auth, allUsers);
router.get("/friends", auth, friends);
router.get("/requestRecieved", auth, requestRecieved);
router.get("/requestSended", auth, requestSended);
router.get("/mutualFriends", auth, mutualFriends);
router.get("/getAllInterest", auth, getAllInterest);
router.get("/getRecommendation", auth, getRecommendation);


router.put("/friendRequestSent", auth, friendRequest);
router.put("/acceptFriendRequest", auth, acceptFriendRequest);
router.put("/rejectFriendRequest", auth, rejectFriendRequest )
router.put("/unfollow", auth, unfollow);
router.put("/withdrawFriendRequest", auth, withdrawRequest);
router.put("/updateInterest", auth, updateInterest);

module.exports = router;