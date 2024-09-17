const User = require("../models/User");


const findMutualFriends = (friends1, friends2) => {
    return friends1.filter(friend => friends2.includes(friend.toString()));
};


exports.userDetails = async (req, res) => {
    const { userID } = req.query;
    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: "fetched user Data",
            user,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again',
        });
    }
}

exports.allUsers = async (req, res) => {
    try {
        console.log("allusers")
        const allUsers = await User.find({ _id: { $ne: req.user.id } });

        console.log("allUser", allUsers);
        return res.status(200).json({
            success: true,
            message: "all Users fetched",
            allUsers
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error",

        });
    }
}

exports.searchUser = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            const allUsers = await User.find({
                _id: { $ne: req.user.id }
            }
            ).select('_id username fullName profileImage interest');
            return res.status(400).json({
                success: true,
                message: "Search query is required",
                allUsers
            });
        }

        const users = await User.find({
            $or: [
                { username: { $regex: new RegExp(query, "i") } },
                { fullName: { $regex: new RegExp(query, "i") } }
            ]
        }).select('_id username fullName profileImage interest');

        return res.status(200).json({
            success: true,
            message: "user fetched successfully",
            allUsers: users,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error, please try again",
        });
    }
};

exports.friends = async (req, res) => {
    try {
        const userID = req.user.id;
        const friends = await User.findById(userID).populate('friends');

        return res.status(200).json({
            success: true,
            message: "All friends are fetched successfully",
            friends: friends.friends
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}

exports.requestRecieved = async (req, res) => {
    try {
        const userID = req.user.id;
        const requestRecieved = await User.findById(userID).populate('friendRequestRecieved');

        return res.status(200).json({
            success: true,
            message: "All friends are fetched successfully",
            requestRecieved: requestRecieved.friendRequestRecieved
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}

exports.requestSended = async (req, res) => {
    try {
        const userID = req.user.id;
        const requestSended = await User.findById(userID).populate('freindRequestSent');

        return res.status(200).json({
            success: true,
            message: "All friends are fetched successfully",
            requestSent: requestSended?.freindRequestSent
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}

exports.mutualFriends = async (req, res) => {
    const userID = req.user.id;
    const { opponentID } = req.query;
    try {
        const user = await User.findById(userID).populate('friends', '_id fullName username profileImage');
        const opponent = await User.findById(opponentID).populate('friends', '_id fullName username profileImage');

        if (!user || !opponent) {
            return res.status(404).json({
                success: false,
                message: "One or both users not found."
            });
        }

        const userFriends = user.friends.map(friend => friend._id.toString());
        const opponentFriends = opponent.friends.map(friend => friend._id.toString());

        // mutual freind IDs
        const mutualFriendsIds = findMutualFriends(userFriends, opponentFriends);

        // mutual friend details
        const mutualFriends = await User.find({ _id: { $in: mutualFriendsIds } }, '_id fullName username profileImage');

        if (mutualFriends) {
            return res.status(200).json({
                success: true,
                message: "Mutual Freinds",
                mutualFriends,
                count: mutualFriends.length
            });
        }
        else {
            return res.status(201).json({
                success: true,
                message: "No Mutual Freinds.",
                mutualFriends: []
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}



exports.friendRequest = async (req, res) => {
    try {
        const { recieverID } = req.query;
        console.log("req user", req.user);
        const sender = await User.findById(req.user.id);
        const reciever = await User.findById(recieverID);

        // /checking they are already request is pending or friend
        if (reciever.friendRequestRecieved.includes(sender._id) || sender.friends.includes(recieverID)) {
            return res.status(400).json({
                messsage: "Request already exist or  an friend"
            });
        }

        // updating model
        reciever.friendRequestRecieved.push(sender._id);
        sender.freindRequestSent.push(recieverID);

        await reciever.save();
        await sender.save();

        return res.status(200).json({
            success: true,
            message: "Request sent successfully"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }


}

exports.acceptFriendRequest = async (req, res) => {
    const { senderID } = req.query;
    try {
        const reciever = await User.findById(req.user.id);
        const sender = await User.findById(senderID);

        // adding friends to both user's friend list
        reciever.friends.push(senderID);
        sender.friends.push(req.user.id);

        // removing from friend request
        reciever.friendRequestRecieved.pull(senderID);
        sender.freindRequestSent.pull(req.user.id);

        await reciever.save();
        await sender.save();

        return res.status(200).json({
            success: true,
            message: "Friend request accepted"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}

exports.rejectFriendRequest = async (req, res) => {
    const { senderID } = req.query;
    try {
        const user = await User.findById(req.user.id);
        const sender = await User.findById(senderID);

        if (sender.freindRequestSent.includes(req.user.id)) {
            sender.freindRequestSent.pull(req.user.id);
            await sender.save();
        }
        if ((user.friendRequestRecieved.includes(senderID))) {
            user.friendRequestRecieved.pull(senderID);
            await user.save();
        }

        return res.status(200).json({
            success: true,
            message: "Rejected request Successfully"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}

exports.unfollow = async (req, res) => {
    const { opponentID } = req.query;
    try {
        const user = await User.findById(req.user.id);
        const opponentUser = await User.findById(opponentID);

        if (user.friends.includes(opponentID)) {
            user.friends.pull(opponentID);
            opponentUser.friends.pull(req.user.id);

            await user.save();
            await opponentUser.save();
        }

        return res.status(200).json({
            success: true,
            message: "removed from friend list."
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}

exports.withdrawRequest = async (req, res) => {
    const { recieverID } = req.query;
    try {
        const user = await User.findById(req.user.id);
        const reciever = await User.findById(recieverID);

        if (user.freindRequestSent.includes(recieverID)) {
            user.freindRequestSent.pull(recieverID);
            await user.save();
        }

        if (reciever.friendRequestRecieved.includes(req.user.id)) {
            reciever.friendRequestRecieved.pull(req.user.id);
            await reciever.save();
        }

        return res.status(200).json({
            success: true,
            message: "Request withdrawn successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error"
        });
    }
}



exports.updateInterest = async (req, res) => {
    const userID = req.user.id;
    const { interests } = req.body;
    console.log("interests", interests)
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ 
                success:false,
                message: 'User not found' 
            });
        }

        const uniqueInterests = [...new Set([...user.interest, ...interests])];
        user.interest = uniqueInterests;
        await user.save();

        return res.status(200).json({
            success:true,
            message :"Interest updated"
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating interests',
            error
        });
    }
}


exports.getAllInterest = async(req,res)=>{
    const interests = [
        'Coding',
        'Reading Books',
        'Machine Learning',
        'Travelling',
        'Music',
        'Sports',
        'Photography',
        'Gaming',
        'Cooking',
        'Writing',
        'Movies',
        'Fitness',
      ];
    
      res.status(200).json({
        success:true,
        message:"Interest Fetched successfully",
        interests
      });
}

exports.getRecommendation = async(req,res)=>{
    const userID = req.user.id;
    try {
        const userInterest = await User.findById(userID);
        console.log("recommendation", userInterest)
        if (!userInterest?.interest) {
            return res.status(404).json({ 
                success:false,
                message: 'Non interst exist' 
            });
        }

        const recommendation = await User.find({
            interest: { $in: userInterest?.interest },  // Match users with similar interests
            _id: { 
                $nin: userInterest?.friends,    // Exclude users who are already in the user's friends list
                $ne: userInterest?._id          // Exclude the user themselves
            }
        });


        console.log("recommendation", recommendation);

        return res.status(200).json({
            success:true,
            message :"Interest updated",
            recommendation
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'recommendation failed',
            error
        });
    }
}