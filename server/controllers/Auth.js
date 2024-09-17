const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
    const { username, fullName, confirmPassword, password } = req.body;
    console.log("singup data",req.body);
    try {
        if (!username || !confirmPassword || !password || !fullName) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        if(password !== confirmPassword){
            return res.status(402).json({
                success:false,
                message:"Password not matched"
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            fullName,
            password: hashedPassword,
            profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`
        });

        user.password = undefined;

        const payload = {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            profileImage: user.profileImage,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "6h"
        });

        const options = {
            expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
            httpOnly: true
        }

        return res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            payload,
            message: "Registered Successfully"
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Registration Failure, try agian",
        });
    }
};

exports.logIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(403).json({
                success: false,
                message: "Username and password are required."
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not exist, Please signUp"
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id : user._id,
                username: user.username,
                fullName: user.fullName,
                profileImage: user.profileImage,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "6h"
            });

            const options = {
                expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
                httpOnly: true
            }

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                payload,
                message: "Login Successfully Successfully"
            })
        }
        else {
            return res.status(402).json({
                success: false,
                message: "Password do not match."
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login failure, try again."
        })
    }
}

