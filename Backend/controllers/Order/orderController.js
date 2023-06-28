
const Order = require("../../model/OrderSchema/OrderSchema")
const Razorpay = require("razorpay")
const crypto = require("crypto")
const Product = require("../../model/ProductSchema/Product")
const PaymentSchema = require("../../model/PaymentSchema/paymentSchema")
const Category = require("../../model/CategorySchema/Category");
const { constants } = require("buffer")

const PlaceOrder = async (req, res) => {
    const body = req.body

    if (!body.userEmail) {
        return res.status(400).json({
            "message": "Something Went Wrong",
            "error": true
        })
    }

    const _id = body._id

    const isExist = await Order.findOne({ _id }).exec()
    if (isExist) {
        return res.status(400).json({
            "message": "Order Already Place",
            "error": true
        })
    }
    // console.log(body)
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
    // console.log("RazroOder", order)
    // 
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

    // console.log("RazorBody", req)

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;


    if (isAuthentic) {
        // Database comes here


        // console.log("PAymentVerification", req.body)
        const obj = {
            razorPayOrderId: razorpay_order_id
        }
        const order = await Order.findOne(obj).exec()

        order.isPaid = true

        await order.save()

        await PaymentSchema.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        });

        const OrderList = order.OrderList
        // reducing quantity of product

        // const updateInfo = OrderList.map(async (product)=>{
        //     const {category ,price, orderQuantity , productId} = product

        //     const categoryToUpadate = await Category.findOne({category}).exec()
        //     categoryToUpadate.totalSale += price*orderQuantity

        //     await categoryToUpadate.save()

        //     const productToUpdate = await Product.findOne({_id : productId}).exec()
        //     productToUpdate.quantity -= orderQuantity

        //     await productToUpdate.save()
        // })

        // await Promise.all(updateInfo);

        // const categoryUpdate = OrderList.map(async (product) => {
        //     console.log("Product" , product)
        //     const { category, price, orderQuantity } = product;

        //     const categoryToUpdate = await Category.findOne({ category }).exec();
        //     console.log("categoryToUpdate " , categoryToUpdate)
        //     categoryToUpdate.totalSale += price * orderQuantity;
        //     await categoryToUpdate.save();
        // });
        // await Promise.all(categoryUpdate)

        // const productUpdate =  OrderList.forEach(async(product)=>{
        //     const {orderQuantity , productId} = product;


        //     const productToUpdate = await Product.findOne({ _id: productId }).exec();
        //     productToUpdate.quantity -= orderQuantity;
        //     console.log("productToUpdate" , productToUpdate)
        //     await productToUpdate.save();
        // })

        // await Promise.all(productUpdate)

        OrderList.forEach(async (product) => {
            const { category, price, orderQuantity, productId } = product;
            console.log("Product " , product)
            await Category.findOneAndUpdate(
                { category },
                { $inc: { totalSale: price * orderQuantity } }
            );

            await Product.findOneAndUpdate(
                { _id: productId },
                { $inc: { quantity: -orderQuantity } }
            );
        });

        // OrderList.map(async (product) => {
        //     const category = product.category
        //     // if (category) {
        //         console.log("Category" , category)
        //         var result = await Category.findOne({ category }).exec()
        //         result.totalSale += product.price*product.orderQuantity
        //         console.log("RESULT", product.price*product.orderQuantity)
        //         // }
        //         await result.save()
        //     })


        // console.log("REdirecting")

        res.redirect(
            // `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
            `http://localhost:5173/payment/success?reference=${razorpay_payment_id}`
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
        // console.log("LIST", list)
        res.status(200).json({
            data: list,
            error: false
        })
    } catch (er) {
        // console.log(er)
        res.status(400).json({
            "message": "Something Went wrong",
            "error": true
        })
    }

}

const getAllOrders = async (req, res) => {

    try {
        const data = await Order.find().sort({ createdAt: -1 })

        res.status(200).json({
            data: data,
            message: "data fetched Successfully",
            error: false
        })
    } catch (err) {
        // console.log(err)
        res.status(200).json({
            message: "Something Went Wrong",
            error: true
        })
    }
}

const setOrderStatus = async (req, res) => {
    const body = req.body
    // console.log("Body", body)
    if (!body) {
        res.status(400).json({
            message: "Something Went Wrong",
            error: true
        })
    }

    const { productIds, orderId } = req.body
    // console.log(productIds, orderId)
    const _id = orderId
    const currentOrder = await Order.findOne({ _id }).exec()
    if (currentOrder) {
        // console.log("Current Order", currentOrder)
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

const getTotalAmount = async (req, res) => {
    try {
        const Payments = await PaymentSchema.find().exec()
        // console.log("Payments", Payments)
        const amount = await Payments.reduce(async (accPromise, payment) => {
            const acc = await accPromise;
            const razorPayOrderId = payment.razorpay_order_id;
            const order = await Order.find({ razorPayOrderId }).exec();

            if (order.length > 0) {
                return acc + order[0].totalAmount;
            }

            return acc;
        }, Promise.resolve(0));

        res.status(200).json({
            "message": "successfully query",
            "total": amount,
            error: false
        })

    } catch (err) {
        // console.log(err)
        res.status(400).json({
            "message": "Something Went Wrong",
            error: true
        })
    }
}

const deleteOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        res.status(400).json({
            "message": "Something Went Wrong",
            "error": true
        })
    }

    const razorpay_order_id = body.id
    const razorPayOrderId = body.id;

    const order = await Order.findOne({ razorPayOrderId }).exec()

    const payment = await PaymentSchema.findOne({ razorpay_order_id }).exec()

    await order.deleteOne({ razorPayOrderId })
    await payment.deleteOne({ razorpay_order_id })

    res.status(200).json({
        "message": "Order Deleted Successfully",
        "error": false
    })


}

const filterOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        res.status(400).json({
            "message": "Data is missing",
            "error": true
        })
    }

    try {

        const { isPaid, orderStatus } = body
        const orders = await Order.find().exec()
        // console.log("Ispaid ", isPaid)
        // console.log("order ", orderStatus)
        // 
        // console.log("condition", (isPaid != ""))
        let result = [];
        if (isPaid != '' && orderStatus === "") {
            // console.log("1")
            result = orders.filter((order) => order.isPaid === isPaid)
        }
        else if (orderStatus != '' && isPaid === "") {
            // console.log("2")
            result = orders.filter((order) => order.orderStatus === orderStatus)
        }
        else if (isPaid != "" && orderStatus != "") {
            // console.log("3")
            result = orders.filter((order) => order.orderStatus === orderStatus && order.isPaid === isPaid)
        }

        res.status(200).json({
            "data": result,
            "error": false
        })



    } catch (err) {
        // console.log(err)
        res.status(400).json({
            "message": err.message,
            "error": true
        })
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params

    try {
        const razorPayOrderId = id
        const order = await Order.find({ razorPayOrderId }).exec()
        if (!order) {
            res.status(400).json({
                "message": "Order Doesnot Exist",
                "error": true
            })
        }

        res.status(200).json({
            "data": order,
            "error": false
        })
    } catch (error) {
        // console.log(error.message)
        res.status(400).json({
            "message": "Something Went Wrong",
            "error": true
        })
    }
}
module.exports = { PlaceOrder, PaymentVerification, getOrderList, getAllOrders, setOrderStatus, filterOrder, getTotalAmount, deleteOrder, getOrderById }