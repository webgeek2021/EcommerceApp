const mongoose = require("mongoose")
const Review = require("../ReviewSchema/Review")
const Schema = mongoose.Schema

const Product = new Schema({
    category: {
        type: String,
        required: [true, "Product must belong to a Category"],
    },
    subCategroy : {
        type : String,
        required : [true , "Product Subcategory is missing" ]
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    price:{
        type : Number,
        required : [true , "Product Price is Missing"],
        
    },
    description: {
        type: String,
        trime: true,
        required: [true, "Description is required "]
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, "Rating must be above or equal 0"],
        max: [5, "Rating must be below or equal 5"],
        //2.667 ==> 26,67 ==> 27 ==> 2.7
        set: (val) => Math.round(val * 10) / 10,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min : 0,
    },
    image: {
        type: String,
        required: true
    },
    reviews: [Review],
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
},
)

Product.virtual('isAvailable').get(function () {
    return this.quantity > 0;
});
module.exports = mongoose.model("Product" , Product)