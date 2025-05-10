require("dotenv").config();
const Razorpay = require('razorpay')
console.log(process.env.RAZORPAY_KEY);
console.log(process.env.RAZORPAY_KEY_SECRET);


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

module.exports = instance;