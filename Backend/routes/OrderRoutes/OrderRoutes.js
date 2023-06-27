
const express = require("express")
const OrderController = require("../../controllers/Order/orderController")

const router = express.Router()

const {isAuth , isAdmin} = require("../../middleWare/verifyRoles")

router.route("/")
    .post(isAuth  , OrderController.PlaceOrder )

router.route("/paymentVerification")
    .post(OrderController.PaymentVerification)

router.route("/getOrder")
    .post(OrderController.getOrderList)

router.route("/filterOrder")
    .post(isAuth , isAdmin , OrderController.filterOrder)
    
router.route("/getAllOrder")
    .get(OrderController.getAllOrders)
    
router.route("/getTotal")
    .get(OrderController.getTotalAmount)

router.route("/:id")
    .get(isAuth , OrderController.getOrderById)
    

router.route("/setOrderStatus")
    .put(OrderController.setOrderStatus)


router.route("/deleteOrder")
    .delete(isAuth , OrderController.deleteOrder)

module.exports = router