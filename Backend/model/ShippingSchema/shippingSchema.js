const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ShippingSchema = new Schema({
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
    }
})

module.exports = ShippingSchema