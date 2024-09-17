const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true
    },
    fullName :{
        type: String,
        require: true
    },
    email:{
        type: String,
    },
    password : {
        type: String,
        require: true
    },
    profileImage: {
         type:String,
         require: true
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    freindRequestSent : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    friendRequestRecieved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    interest:[
        {
            type: String
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);