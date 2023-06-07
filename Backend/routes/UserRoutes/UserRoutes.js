
const express = require("express")
const router = express.Router()
const {isAuth , isAdmin} = require("../../middleWare/verifyRoles")
const UserController = require("../../controllers/User/userController")

router.route("/getUser")
    .get(isAuth , UserController.getUser)

router.route("/update/profile")
    .put(isAuth , UserController.updateUser)

router.route("/shippingDetails")
    .get(isAuth , UserController.getShippingDetails)

router.route("/update/shippingDetails")
    .put(isAuth , UserController.updateShippingDetails)
module.exports = router