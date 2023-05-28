const cloudinary = require("cloudinary")

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
}

module.exports = configCloudinary