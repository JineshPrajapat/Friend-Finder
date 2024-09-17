const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.connect = () =>{
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET
        });

        console.log("Connection successfull with cloudinary");
    }
    catch(err)
    {
        console.log("Connection failed ith cloudinary");
        console.log(err);
    }
};

