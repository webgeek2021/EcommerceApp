const mongoose = require("mongoose")
const Schema = mongoose.Schema
const CategoryProduct = require("./CategoryProduct.js")

const CategorySchema = new Schema({
    category: {
        type: String,
        required: [true, "Category name is required"],
    },
    image: {
        type: String,
        required: [true, "Category must have image"],
    },
    description: {
        type : String,
        required: [true , "Category Description is Missing"]
    },
    subCategories : ["All"],
    products: [CategoryProduct],
    totalSale: {
        type: Number,
        required: true,
        default : 0
    }
},{timestamps: true})

module.exports = mongoose.model("Category" , CategorySchema)