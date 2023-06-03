
const express = require("express")
const OrderController = require("../../controllers/Order/orderController")

const router = express.Router()

const {isAuth , isAdmin} = require("../../middleWare/verifyRoles")

router.route("/")
    .post(isAuth , isAdmin , )