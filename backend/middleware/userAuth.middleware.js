const User = require("../models/user.js");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const jwt = require('jsonwebtoken');


exports.verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiErrorHandler("401", "unauthorized access");
        }
    
        const decodedToken = await jwt.verify(token, process.env.ACESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if (!user) {
            throw new ApiErrorHandler("401", "Invalid access Token");
        }
    
        req.user = user;
        next()
    } catch (error) {
        return next ( new ApiErrorHandler(401 , error?.message || "Invalid access to the token "))
    }
};

