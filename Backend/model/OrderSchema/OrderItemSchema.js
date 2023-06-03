const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderItemSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name of Product is Reuired"]
    },
    orderQuantity : {
        type : Number,
        required : [true, "Order Quantity is Required"]
    },
    price : {
        type : Number,
        required : [true, "Price is Required"]
    },
    image : {
        type : String,
        required : [true , "Product image is missing"]
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    }
})

module.export = mongoose.model("OrderItemSchema" , OrderItemSchema);