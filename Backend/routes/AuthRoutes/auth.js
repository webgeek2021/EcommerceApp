
const express = require("express");

const router  = express.Router();

const authController = require("../../controllers/authController");

router.route("/signin")
    .post(authController.handleSignIn)
router.route("/signup")
    .post(authController.handleSignUp)
    

module.exports = router