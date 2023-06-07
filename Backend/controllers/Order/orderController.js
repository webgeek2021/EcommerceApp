
const Order = require("../../model/OrderSchema/OrderSchema")

const PlaceOrder = async (req,res)=>{
    const body = req.body

    if(!body.userEmail){
        return res.status(400).json({
            "message" : "Something Went Wrong",
            "error" : true
        })
    }

    const result = await Order.create({body})

    res.status(200).json({
        "message" : "Order Placce Successfully",
        "error" : false
    })


}

module.exports = {PlaceOrder}