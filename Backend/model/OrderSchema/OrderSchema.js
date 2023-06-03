
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
    OrderList : {
        type : [OrderItemSchema],
        required : [true , "Order List Can be Empty"]
    },
    shipping : shippingSchema,
    payment : PaymentSchema,
    totalAmount :{
        type : Number,
        required : true,
        default : 0,
    },
    isPaid : {
        type : Boolean,
        required : true,
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