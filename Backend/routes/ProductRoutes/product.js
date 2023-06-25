
const express = require("express");
const verifyRoles = require("../../middleWare/verifyRoles")
const verifyJWT = require("../../middleWare/verifyJWT")
const router  = express.Router();
const ROLES_LIST = require("../../config/UserRoles")
const productController = require("../../controllers/Products/productController")
const deleteProduct = require("../../controllers/Products/productController");
const Multer = require("multer")
const {isAuth , isAdmin} = require("../../middleWare/verifyRoles")
const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.route("/getProducts")
    .get(productController.getAllProducts)

router.route("/:id")
    .get(productController.getProductById)

router.route("/getProduct/:category")
    .get(isAuth , productController.getProductByCategory)
    
router.route("/search/product/:query")
    .get(productController.getProductBySearch)

router.route("/search/:query")
    .get(productController.searchProductByQuery)

router.route("/addproduct")
    .post(isAuth,isAdmin ,upload.single("image"),productController.addProduct)

router.route("/review")
    .post(isAuth , productController.addReview)
        
router.route("/filterProduct")
    .post(productController.filterProduct)
    
router.route("/edit")
    .put(upload.single("image"),productController.updateProduct)

router.route("/delete/:id")
    .delete(productController.deleteProduct)

module.exports = router