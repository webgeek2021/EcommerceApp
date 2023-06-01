const cloudinary = require("cloudinary")

const opts = {
    upload_preset: "unsigned_upload",
    allowed_format: ["png", "jpg", "svg", "jpeg"],
    transformation: [
        {
            width: 500,
            height: 400,
            crop: "fill",
            gravity: "auto",
        },
    ],
}

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
}

async function handleUpload(file , folder) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder : folder
    });
    return res;
  }

module.exports = {configCloudinary , opts , handleUpload}