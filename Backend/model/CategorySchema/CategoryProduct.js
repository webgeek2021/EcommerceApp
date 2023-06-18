
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categoryProductSchema = new Schema({
    productId : {
        type : String,
        required : [true , "Product id is missing"]
    },
})

module.export = mongoose.model("CategoryProduct" ,categoryProductSchema)