const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.cookies.token || req.body.token;
        // checking if token exits
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found."
            });
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        // verifying token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: "TOken is not valid"
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while token verification.",
        });
    }
}