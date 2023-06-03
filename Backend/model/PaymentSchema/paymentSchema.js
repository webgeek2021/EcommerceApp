const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    paymentMethod : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("PaymentSchema" , PaymentSchema)