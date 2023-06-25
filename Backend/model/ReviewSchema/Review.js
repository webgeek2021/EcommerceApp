const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Review = new Schema({
    reviewBy : {
        type : String,
        required :true
    },
    ratingGiven : {
        type : Number,
        required : true,
    },
    reviewMessage : {
        type : String,
        required : true
    },
    profileImage : {
        type : String,
    }
})

module.export = mongoose.model("Review" , Review)