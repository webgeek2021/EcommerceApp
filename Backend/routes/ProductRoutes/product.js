
const express = require("express");

const router  = express.Router();
const productController = require("../../controllers/Products/productController")

router.route("/getProducts")
    .get(productController.getAllProducts)

module.exports = router