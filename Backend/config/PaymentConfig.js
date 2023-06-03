const Razorpay = require("razorpay")
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET_KEY,
  });

module.export = instance