const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ShippingSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    address : {
        type : String,
        required : [true , "Address is required"],
    },
    city : {
        type : String,
        required : [true , "City is required"]
    },
    postalCode : {
        type : Number ,
        required : [true , "Postal Code is Required"]
    },
    country : {
        type : String,
        required : [true , "Country is Required"]
    },
    state :{
        type : String,
        required : [true, "State is Required "]
    }
})

module.exports = mongoose.model("ShippingSchema", ShippingSchema)