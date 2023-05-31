
const express = require("express");
const verifyRoles = require("../../middleWare/verifyRoles")
const verifyJWT = require("../../middleWare/verifyJWT")
const router  = express.Router();
const ROLES_LIST = require("../../config/UserRoles")
const productController = require("../../controllers/Products/productController")
const deleteProduct = require("../../controllers/Products/productController");

router.route("/getProducts")
    .get(productController.getAllProducts)

router.route("/:id")
    .get(productController.getProductById)


router.route("/addproduct")
    .post(productController.addProduct)
    
router.route("/edit")
    .put(productController.updateProduct)

router.route("/delete/:id")
    .delete(productController.deleteProduct)

module.exports = router