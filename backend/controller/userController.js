const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ApiErrorHandler = require('../utils/ApiErrorHandler');
const ApiResponse = require('../utils/ApiResponse');

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const userWithToken = await User.findById(userId);
        if (!userWithToken) {
            throw new ApiErrorHandler(404, "User not found");
        }

        const accessToken = userWithToken.generateAccessToken();
        const refreshToken = userWithToken.generateRefreshToken();

        userWithToken.refreshToken = refreshToken;
        await userWithToken.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiErrorHandler(500, "Something went wrong while generating access and refresh token");
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        if ([fname, lname, email].some((field) => field?.trim() === "")) {
            throw new ApiErrorHandler(400, "All fields must be filled");
        }

        const existedUser = await User.findOne({ $or: [{ email }, { fname }] });
        if (existedUser) {
            throw new ApiErrorHandler(400, "User already exists");
        }

        const user = await User.create({ fname, lname, email, password });
        const createdUser = await User.findById(user._id).select("-__v");

        if (!createdUser) {
            throw new ApiErrorHandler(500, "Something went wrong while registering user");
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
        const { email, password } = req.body;

        if (!email) {
            throw new ApiErrorHandler(400, "Email is required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiErrorHandler(404, "User not found");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiErrorHandler(401, "Invalid user credentials");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        };

        return res.status(200)
            .cookie("access_token", accessToken, options)
            .cookie("refresh_token", refreshToken, options)
            .json(new ApiResponse(
                200,
                { fname: loggedInUser.fname, lname: loggedInUser.lname, email: loggedInUser.email , id:loggedInUser._id },
                "User logged in successfully"
            ));
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Email or Password incorrect"
        });
    }
};

exports.fetchUsername = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                data: null,
                message: "User not found"
            });
        }

        return res.status(200).json({
            statusCode: 200,
            data: user,
            message: "User fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            statusCode: 500,
            data: null,
            message: "Failed to fetch user"
        });
    }
};

exports.logoutUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: undefined } },
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
        next(new ApiErrorHandler(500, "Error during logout process"));
    }
};

exports.refreshAccessToken = async (req, res, next) => {
    const inCommingRefreshToken = req.cookies.refresh_token || req.body.refresh_token;

    if (!inCommingRefreshToken) {
        throw new ApiErrorHandler(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(inCommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken.id);
        if (!user) {
            throw new ApiErrorHandler(401, "Invalid RefreshToken");
        }

        if (inCommingRefreshToken !== user.refreshToken) {
            throw new ApiErrorHandler(401, "RefreshToken is either invalid or expired");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        return res.status(200)
            .cookie("access_token", newAccessToken, options)
            .cookie("refresh_token", newRefreshToken, options)
            .json(new ApiResponse(200, { newAccessToken, newRefreshToken }, "Successfully generated new tokens"));
    } catch (error) {
        next(new ApiErrorHandler(500, "Error during generating new refreshTokens process"));
    }
};

exports.addAddress = async (req, res) => {
    try {
        const { userId, address, city, state, postalCode, country } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.addresses.push({ address, city, state, postalCode, country });
        await user.save();

        res.status(200).json({ message: 'Address added successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding address', error: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const { userId, addressId, address, city, state, postalCode, country } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const addressToUpdate = user.addresses.id(addressId);
        if (!addressToUpdate) {
            return res.status(404).json({ message: 'Address not found' });
        }

        addressToUpdate.address = address || addressToUpdate.address;
        addressToUpdate.city = city || addressToUpdate.city;
        addressToUpdate.state = state || addressToUpdate.state;
        addressToUpdate.postalCode = postalCode || addressToUpdate.postalCode;
        addressToUpdate.country = country || addressToUpdate.country;

        await user.save();

        res.status(200).json({ message: 'Address updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.addresses.id(addressId).remove();
        await user.save();

        res.status(200).json({ message: 'Address deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address', error: error.message });
    }
};

// Add an item to the wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product is already in the wishlist
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product is already in the wishlist' });
        }

        // Add product to the wishlist
        user.wishlist.push(productId);
        await user.save();

        res.status(200).json({ message: 'Product added to wishlist successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to wishlist', error: error.message });
    }
};

// Remove an item from the wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product is in the wishlist
        if (!user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product not found in wishlist' });
        }

        // Remove product from the wishlist
        user.wishlist.pull(productId);
        await user.save();

        res.status(200).json({ message: 'Product removed from wishlist successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from wishlist', error: error.message });
    }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product is already in the cart
        const existingCartItem = user.cart.find(item => item.productId.toString() === productId);
        if (existingCartItem) {
            // Update quantity if product is already in the cart
            existingCartItem.quantity = quantity;
        } else {
            // Add new product to the cart
            user.cart.push({ productId, quantity });
        }

        await user.save();

        res.status(200).json({ message: 'Product added to cart successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the cart item to be removed
        const cartItem = user.cart.find(item => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(400).json({ message: 'Product not found in cart' });
        }

        // Remove product from the cart
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();

        res.status(200).json({ message: 'Product removed from cart successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error: error.message });
    }
};

exports.getDataFromCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find user by ID and populate the cart with product details
        const user = await User.findById(userId).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send back the cart data
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart data', error: error.message });
    }
};
