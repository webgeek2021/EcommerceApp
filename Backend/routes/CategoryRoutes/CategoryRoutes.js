
const express = require("express")
const router = express.Router()

const {isAuth,isAdmin}  = require("../../middleWare/verifyRoles")
const CategoryController = require("../../controllers/Category/CategoryController")

router.route("/get-category-list")
    .get(isAuth , isAdmin , CategoryController.getCategoryList)

module.exports = router