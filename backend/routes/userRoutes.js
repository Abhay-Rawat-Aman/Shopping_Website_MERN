const express = require('express')

const { registerUser, fetchUser, logoutUser, refreshAccessToken, fetchUsername } = require('../controller/userController');
const { verifyJwt } = require('../middleware/userAuth.middleware');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, createVariationType, createVariationValue, getProductByCategory, getProductByBrandId } = require('../controller/productController.js');

const router = express.Router();

router.route("/admin/signup").post(registerUser);
router.route("/admin/login").post(fetchUser);
router.get('/admin/userName/:id', fetchUsername);
router.route("/admin/logout").post(verifyJwt, logoutUser);
router.route("/admin/refresh-Token").post(logoutUser);

router.route("/admin/createProduct").post(createProduct);
router.route("/admin/getAllProducts").get(getAllProducts);
router.route("/admin/getProductById/:id").get(getProductById);
router.route("/admin/updateProduct/:id").put(updateProduct);
router.route("/admin/deleteProduct/:id").get(deleteProduct);
router.route("/admin/createVariationType").post(createVariationType);
router.route("/admin/createVariationValue").post(createVariationValue);
router.route("/admin/getProductByCategory/:id").get(getProductByCategory);
router.route("/admin/getProductByBrandId/:id").get(getProductByBrandId);


router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

module.exports = router;