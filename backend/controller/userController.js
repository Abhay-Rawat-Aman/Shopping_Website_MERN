const jwt  = require('jsonwebtoken');
const User = require('../models/user');
const ApiErrorHandler = require('../utils/ApiErrorHandler');
const ApiResponse = require('../utils/ApiResponse');

const generateAccessAndRefreshToken = async (userId) => {
    try {

        const userWithToken = await User.findById(userId);
        const accessToken = userWithToken.generateAccessToken();
        const refreshToken = userWithToken.generateRefreshToken();

        userWithToken.refreshToken = refreshToken;

        await userWithToken.save();
        // user.save(validateBeforeSave : false); // to avoid the required fields

        return { accessToken: accessToken, refreshToken: refreshToken }

    } catch (error) {
        throw new ApiErrorHandler(500, "Something went wrong while generating access and refresh token");
    }
}


exports.registerUser = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        if ([fname, lname, email].some((field) => field?.trim() === "")) {
            throw new ApiErrorHandler(400, "All fields must be filled");
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { fname }]
        });

        if (existedUser) {
            throw new ApiErrorHandler(400, "User already exists");
        }

        const user = await User.create({
            fname, lname, email, password
        });

        const createdUser = await User.findById(user._id).select("-__v");

        if (!createdUser) {
            throw new ApiErrorHandler("Something went wrong while registering user");
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: createdUser
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

exports.fetchUser = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body

        if (!(fname || lname || email)) {
            throw new ApiErrorHandler("400", "Fname or email required")
        }


        const user = await User.findOne({
            $or: [ { email } , { fname}]
        })


        if (!user) {
            throw new ApiErrorHandler("404", "User not found");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiErrorHandler("401", " Invalid user credentials");
        }


        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);


        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).cookie("access_token", accessToken, options).cookie("refresh_token", refreshToken, options).json(
            new ApiResponse(
                200, 
                {
                    user : loggedInUser , accessToken , refreshToken
                },
                "User Loged in successfully"
            )
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};


exports.logoutUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                }
            },
            { new: true }
        );

        const options = {
            httpOnly: true,
            secure: true
        };

        res.clearCookie("access_token", options);
        res.clearCookie("refresh_token", options);

        return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
    } catch (error) {
        next(new ApiErrorHandler(500, { }  ,"Error during logout process"));
    }
};

exports.refreshAccessToken = async (req, res, next) => {
    const inCommingRefreshToken = req.cookie.refresh_token || req.body.refresh_token ;
    
    if(!inCommingRefreshToken){
        throw new ApiErrorHandler(401 , "Unauthorized request" )
    }

    try {
        const decodedToken = await jwt.verify(inCommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?.id)
    
        if(!user){
            throw new ApiErrorHandler(401 , "Invalid RefreshToken")
        }
    
        if (inCommingRefreshToken !== user?.refreshToken){
            throw new ApiErrorHandler(401 , "RefreshToken is either invalid or expired")
        }
    
        const options = {
            httpOnly : true,
            secured : true
        }
    
        const {newaccessToken , newrefreshToken} = await generateAccessAndRefreshToken(user?._id , options)
    
        return res.status(200).cookie("access_token", newaccessToken, options ).cookie("refresh_token", newrefreshToken , options).json(
            new ApiResponse(200 , {newaccessToken , newrefreshToken} , "Successfully generated new tokens")
        )
    } catch (error) {
        next(new ApiErrorHandler(500, {}, "Error during generating new refreshTokens process"));
    }
}