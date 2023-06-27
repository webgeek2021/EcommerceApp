
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

router.route("/getTotal")
    .get(isAuth , isAdmin , CategoryController.getTotal)

router.route("/:category")
    .get(isAuth , isAdmin ,CategoryController.getProductByCategory)
    
router.route("/subCategory/:category")
    .get(CategoryController.getSubCategory)

router.route("/chartData/pie")
    .get(isAuth , isAdmin , CategoryController.getPieChartData)

router.route("/chartData/sales/pie")
    .get(isAuth,isAdmin,CategoryController.getTotalSalesData)


router.route("/delete/:category")
    .delete(isAuth , isAdmin , CategoryController.deleteCategory)

module.exports = router