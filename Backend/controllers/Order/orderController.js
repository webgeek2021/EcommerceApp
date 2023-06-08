
const Order = require("../../model/OrderSchema/OrderSchema")
const Razorpay = require("razorpay")
const crypto = require("crypto")
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
        "message": "Order Placce Successfully",
        "error": false,
        "data": order
    })
}


const PaymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    
    console.log("RazorBody" , req)

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    

    if (isAuthentic) {
        // Database comes here
        console.log("PAymentVerification" , req.body)
        await PaymentSchema.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.redirect(
            `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
}

module.exports = { PlaceOrder , PaymentVerification }