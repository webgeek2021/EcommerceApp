const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
         required: true
    },
    password: {
        type: String,
         required: false
    },
    profilePicture: {
        type: String,
         required: false
    },
    roles :{
        User : {
            type: Number,
            default : 2001,
        },
        Editor : Number,
        Admin  : Number
    }
})

module.exports = mongoose.model("User", userSchema)
