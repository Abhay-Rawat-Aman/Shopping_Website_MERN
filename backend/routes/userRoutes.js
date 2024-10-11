const express = require('express');
const { registerUser, fetchUser, logoutUser, refreshAccessToken, fetchUsername, addAddress, updateAddress, deleteAddress, addToWishlist, removeFromWishlist, addToCart, removeFromCart, getDataFromCart } = require('../controller/userController');
const { createOrder, verifyPayment } = require('../controller/priceController'); // Updated imports
const { verifyJwt } = require('../middleware/userAuth.middleware');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, createVariationType, createVariationValue, getProductByCategory, getProductByBrandId } = require('../controller/productController');
const { createCategory, getCategories, getCategoryById, getCategoryByName } = require('../controller/categoryController');
const { createBrand, getBrands } = require('../controller/BrandController');

const router = express.Router();

// User routes
router.route("/admin/signup").post(registerUser);
router.route("/admin/login").post(fetchUser);
router.get('/admin/userName/:id', fetchUsername);
router.route("/admin/logout").post(verifyJwt, logoutUser);
router.route("/admin/refresh-Token").post(refreshAccessToken);

// Address routes
router.route("/admin/addAddress").post(addAddress);
router.route("/admin/updateAddress/:id").put(updateAddress);
router.route("/admin/deleteAddress/:id").delete(deleteAddress);

// Wishlist routes
router.route("/admin/addToWishlist").post(addToWishlist);
router.route("/admin/removeFromWishlist").post(removeFromWishlist);

// Cart routes
router.route("/admin/addToCart").post(addToCart);
router.route("/admin/removeFromCart").post(removeFromCart);
router.route("/admin/getDataFromCart").post(getDataFromCart);

// Category routes
router.route("/admin/createCategory").post(createCategory);
router.route("/admin/getCategories").get(getCategories);
router.route("/admin/getCategoryById/:id").get(getCategoryById);
router.route("/admin/getCategoryByName/:name").get(getCategoryByName);

// Brand routes
router.route("/admin/createBrand").post(createBrand);
router.route("/admin/getBrands").get(getBrands);

// Product routes
router.route("/admin/createProduct").post(createProduct);
router.route("/admin/getAllProducts").get(getAllProducts);
router.route("/admin/getProductById/:id").get(getProductById);
router.route("/admin/updateProduct/:id").put(updateProduct);
router.route("/admin/deleteProduct/:id").delete(deleteProduct);

// Payment routes
router.route("/admin/createOrder").post(createOrder);  
router.route("/admin/verifyPayment").post(verifyPayment); 

// Variation routes
router.route("/admin/createVariationType").post(createVariationType);
router.route("/admin/createVariationValue").post(createVariationValue);

// Product filtering routes
router.route("/admin/getProductByCategory/:id").get(getProductByCategory);
router.route("/admin/getProductByBrandId/:id").get(getProductByBrandId);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

module.exports = router;
