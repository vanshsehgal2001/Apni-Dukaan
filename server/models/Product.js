const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter the description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price"],
        maxLength: [8, "Price can't exceed 8 digits"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            img_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    inStock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "Stock can't exceed 10000 items"],
        default: 1
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
})

const ProductModel = mongoose.model("Product", ProductSchema)

module.exports = ProductModel