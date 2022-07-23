const ErrorHandler = require('../utils/ErrorHandler')
const handleAsyncErrors = require('../middleware/AsyncErrors')
const Product = require('../models/Product')
const Order = require('../models/Order')

const createOrder = handleAsyncErrors(async (req, res, next) => {
    const {
        shippingInformation,
        paymentInformation,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const orderDetails = {
        shippingInformation,
        paymentInformation,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    }
    const order = await Order.create(orderDetails)

    res.status(201).json({
        success: true,
        order
    })

})


const getOrder = handleAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.order_id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found", 400))
    }

    res.status(200).json({
        success: true,
        order
    })

})


const getMyOrders = handleAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })

})


const getOrders = handleAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })

})


const updateOrder = handleAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.order_id)

    if (!order) {
        return next(new ErrorHandler("Order not found", 400))

    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Order already been delivered", 400))
    }

    if (req.body.orderStatus === "Shipped") {
        order.orderItems.forEach(async orderItem => {
            await updateItems(orderItem.product, orderItem.quantity)
        })
    }


    order.orderStatus = req.body.orderStatus

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        order
    })

})


const updateItems = async (prod_id, quantity) => {
    const product = await Product.findById(prod_id)

    product.inStock -= quantity

    await product.save({ validateBeforeSave: false })

}


const deleteOrder = handleAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.order_id);

    if (!order) {
        return next(new ErrorHandler("Order already been delivered", 400))
    }

    await order.remove()

    res.status(200).json({
        success: true,
        msg: "Order deleted successfully"
    })

})



module.exports = {
    createOrder,
    getOrder,
    getMyOrders,
    getOrders,
    updateOrder,
    deleteOrder
}