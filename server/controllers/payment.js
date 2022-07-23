const razorpay = require('razorpay')
const handleAsyncErrors = require('../middleware/AsyncErrors')
const crypto = require('crypto')

const paymentIntegration = handleAsyncErrors(async (req, res, next) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: 'INR'
    }
    const instance = new razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET
    })
    const order = await instance.orders.create(options)
    res.status(201).json({
        success: true,
        order
    })
})

const paymentVerification = handleAsyncErrors(async (req, res, next) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex')


    const isAuthentic = (razorpay_signature === expectedSignature)

    if (isAuthentic) {
        res.status(200).json({
            success: true,
            razorpay_payment_id,
            razorpay_order_id
        })
    }
    else {
        res.status(400).json({
            success: false
        })
    }
})

const getKey = handleAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_KEY
    })
})

module.exports = {
    paymentIntegration,
    paymentVerification,
    getKey
}