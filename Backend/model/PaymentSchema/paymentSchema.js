const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    razorpay_order_id : {
        type : String,
        required : true
    },
    razorpay_payment_id : {
        type : String,
        required : true
    },
    razorpay_signature :{
        type : String,
        required : true
    }

},{
    timestamps : true
})

module.exports =  mongoose.model("PaymentSchema" , PaymentSchema)