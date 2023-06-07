
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PaymentSchema = require("../PaymentSchema/paymentSchema.js");
const OrderItemSchema = require("./OrderItemSchema");

const OrderSchema = new Schema({
    userId  : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "User Id is required"]
    },
    userEmail : {
        type : String,
        required : [true , "User Email is required"]
    },
    OrderList : [OrderItemSchema],
    shippingId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ShippingSchema",
        required : [true , "Shipping Details Are Missing"]
    },
    totalAmount :{
        type : Number,
        required : true,
        default : 0,
    },
    isPaid : {
        type : Boolean,
        required : true,
        default : false
    },
    paidAt : {
        type : Date
    },
    isDelivered : {
        type : Boolean,
        default : false,
    }
},{
    timestamps : true
}
)

module.exports = mongoose.model("Order" , OrderSchema)