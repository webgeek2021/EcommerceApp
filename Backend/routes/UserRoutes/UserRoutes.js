
const express = require("express")
const router = express.Router()
const { isAuth, isAdmin } = require("../../middleWare/verifyRoles")
const UserController = require("../../controllers/User/userController")
const Multer = require("multer")
const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.route("/getUser")
    .get(isAuth, UserController.getUser)

router.route("/update/profile")
    .put(isAuth, upload.single("image"),UserController.updateUser)

router.route("/shippingDetails")
    .get(isAuth, UserController.getShippingDetails)

router.route("/getTotalUser")
    .get(isAuth, isAdmin,UserController.getTotalUser)

router.route("/update/shippingDetails")
    .put(isAuth, UserController.updateShippingDetails)
module.exports = router