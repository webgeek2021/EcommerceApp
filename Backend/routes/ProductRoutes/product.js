
const express = require("express");

const router  = express.Router();
const productController = require("../../controllers/Products/productController")

router.route("/getProducts")
    .get(productController.getAllProducts)

router.route("/:id")
    .get(productController.getProductById)

module.exports = router