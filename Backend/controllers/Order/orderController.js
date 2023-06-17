
const Order = require("../../model/OrderSchema/OrderSchema")
const Razorpay = require("razorpay")
const crypto = require("crypto")
const Product = require("../../model/ProductSchema/Product")
const PaymentSchema = require("../../model/PaymentSchema/paymentSchema")

const PlaceOrder = async (req, res) => {
    const body = req.body

    if (!body.userEmail) {
        return res.status(400).json({
            "message": "Something Went Wrong",
            "error": true
        })
    }
    console.log(body)
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET_KEY,
    });
    const options = {
        amount: Number(body.totalAmount * 100), // * 100 to convert into paise
        currency: "INR",
    };

    // console.log("Instance", instance)
    const order = await instance.orders.create(options);
    console.log("RazroOder", order)

    body.razorPayOrderId = order.id
    const result = await Order.create(body)

    res.status(200).json({
        "message": "Order Place Successfully",
        "error": false,
        "data": order
    })
}


const PaymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    console.log("RazorBody", req)

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;


    if (isAuthentic) {
        // Database comes here


        console.log("PAymentVerification", req.body)
        await PaymentSchema.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });
        const obj = {
            razorPayOrderId: razorpay_order_id
        }
        const order = await Order.findOne(obj).exec()

        order.isPaid = true

        await order.save()
        console.log("REdirecting")
        res.redirect(
            // `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
            `http://localhost:5173/profile`
        );

    } else {
        res.status(400).json({
            success: false,
        });
    }
}

const getOrderList = async (req, res) => {
    const body = req.body
    // console.log(req)
    if (!body.email) {
        return res.status(400).json({
            "message": "Something Went Wrong",
            "error": true
        })
    }
    try {
        const email = body.email
        const list = await Order.find({ userEmail: email }).exec()
        console.log("LIST", list)
        res.status(200).json({
            data: list,
            error: false
        })
    } catch (er) {
        console.log(er)
        res.status(400).json({
            "message": "Something Went wrong",
            "error": true
        })
    }

}

const getAllOrders = async (req, res) => {

    try {
        const data = await Order.find().exec()

        res.status(200).json({
            data: data,
            message: "data fetched Successfully",
            error: false
        })
    } catch (err) {
        console.log(err)
        res.status(200).json({
            message: "Something Went Wrong",
            error: true
        })
    }
}

const setOrderStatus = async (req, res) => {
    const body = req.body
    console.log("Body", body)
    if (!body) {
        res.status(400).json({
            message: "Something Went Wrong",
            error: true
        })
    }

    const { productIds, orderId } = req.body
    console.log(productIds, orderId)
    const _id = orderId
    const currentOrder = await Order.findOne({ _id }).exec()
    if (currentOrder) {
        console.log("Current Order" , currentOrder)
        currentOrder.orderStatus = "Shipped"
        await currentOrder.save()
    }

    // set product quantity

    productIds.map(async (product) => {
        const _id = product.productId
        const currentProduct = await Product.findById({ _id }).exec()
        if (currentProduct) {
            // Update the product quantity here
            currentProduct.quantity -= product.quantity;
            await currentProduct.save();
        }
    })

    res.status(200).json({
        message: "Updated SuccessFully",
        error: false
    })
}
module.exports = { PlaceOrder, PaymentVerification, getOrderList, getAllOrders, setOrderStatus }