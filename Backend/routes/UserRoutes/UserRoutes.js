
const express = require("express")
const router = express.Router()
const {isAuth , isAdmin} = require("../../middleWare/verifyRoles")
const UserController = require("../../controllers/User/userController")

router.route("/getUser")
    .get(isAuth , UserController.getUser)

router.route("/update/profile")
    .put(isAuth , UserController.updateUser)

module.exports = router