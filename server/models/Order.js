const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    shippingInformation: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: "India"
        },
        pinCode: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    },
    paymentInformation: {
        status: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            prod_id: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ],
    paidAt: {
        type: Date,
        default: Date.now
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0
    }
    ,
    taxPrice: {
        type: Number,
        required: true,
        default: 0
    }
    ,
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    }
    ,
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const OrderModel = mongoose.model("Order", OrderSchema)

module.exports = OrderModel