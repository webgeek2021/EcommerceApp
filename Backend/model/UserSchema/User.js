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
        required: true,
        default : "https://res.cloudinary.com/dwlgkphss/image/upload/v1687669234/user_tobnts.jpg"
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    },
    
})

module.exports = mongoose.model("User", userSchema)
