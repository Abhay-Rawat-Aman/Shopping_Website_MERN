const express = require('express')

const { registerUser, fetchUser, logoutUser, refreshAccessToken } = require('../controller/userController');
const { verifyJwt } = require('../middleware/userAuth.middleware');

const router = express.Router();

router.route("/admin/signup").post(registerUser);
router.route("/admin/login").post(fetchUser);
router.route("/admin/logout").post(verifyJwt, logoutUser);
router.route("/admin/refresh-Token").post(logoutUser);

router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

module.exports = router;