const express = require('express')

const {
    registerUser
} = require('../controller/userController');

const router = express.Router();

router.route("/admin/signup").post(registerUser);

module.exports = router;