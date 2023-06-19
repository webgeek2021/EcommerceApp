
const express = require("express")
const router = express.Router()
const Multer = require("multer")
const {isAuth,isAdmin}  = require("../../middleWare/verifyRoles")
const CategoryController = require("../../controllers/Category/CategoryController")
const storage = Multer.memoryStorage();
const upload = Multer({
    storage,
})
router.route("/get-category-list")
    .get(isAuth , isAdmin , CategoryController.getCategoryList)

router.route("/addcategory")
    .post(isAuth , isAdmin , upload.single("image"),CategoryController.addCategory)
router.route("/:category")
    .get(isAuth , isAdmin ,CategoryController.getProductByCategory)
module.exports = router