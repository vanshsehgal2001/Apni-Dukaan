const Product = require('../models/Product')
const ErrorHandler = require('../utils/ErrorHandler')
const handleAsyncErrors = require('../middleware/AsyncErrors')
const QueryHandler = require('../utils/QueryHandler')
const cloudinary = require('cloudinary')

//******ADMIN*******

const createProduct = handleAsyncErrors(async (req, res) => {

    let images = []

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    }
    else {
        images = req.body.images
    }

    const cloudinaryImages = []

    for (let i = 0; i < images.length; i++) {
        const cloud = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
            width: 250,
            crop: "fit"
        })
        cloudinaryImages.push({
            img_id: cloud.public_id,
            url: cloud.secure_url
        })

    }

    req.body.user = req.user.id
    req.body.images = cloudinaryImages

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})


const updateProduct = handleAsyncErrors(async (req, res) => {
    let product = await Product.findById(req.params.prod_id);
    if (!product) {
        return res.send(500).json({
            success: false,
            msg: "Product not found"
        })
    }

    let images = []

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    }
    else {
        images = req.body.images
    }

    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].img_id)
        }

        const cloudinaryImages = []

        for (let i = 0; i < images.length; i++) {
            const cloud = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
                width: 250,
                crop: "fit"
            })
            cloudinaryImages.push({
                img_id: cloud.public_id,
                url: cloud.secure_url
            })

        }
        req.body.images = cloudinaryImages

    }



    product = await Product.findByIdAndUpdate(req.params.prod_id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

const deleteProduct = handleAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.prod_id)

    if (!product) {
        return res.status(500).json({
            success: false,
            msg: "Product not found"
        })
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].img_id)
    }


    await product.remove()

    res.status(200).json({
        success: true,
        msg: "Product deleted successfully"
    })
})


//********USER*********

const getAllProducts = handleAsyncErrors(async (req, res) => {
    const productsPerPage = 5;
    // return next(new ErrorHandler("Product not found", 500))
    const queryHandler = new QueryHandler(Product.find(), req.query).search().filter()

    let products = await queryHandler.query.clone()
    let filteredCount = products.length
    queryHandler.pagination(productsPerPage)

    products = await queryHandler.query;
    const prodsCount = await Product.countDocuments()
    res.status(201).json({
        success: true,
        products,
        prodsCount,
        productsPerPage,
        filteredCount
    })
})

const getAllProductsAdmin = handleAsyncErrors(async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
})

const getProduct = handleAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.prod_id)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})



const createProductReview = handleAsyncErrors(async (req, res, next) => {
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
    }

    const product = await Product.findById(req.body.product_id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 400))
    }

    const isReviewed = await product.reviews.find(rev => rev.user.toString() === req.user.id.toString())

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user.id.toString()) {
                rev.rating = req.body.rating;
                rev.comment = req.body.comment;
            }
        })
    }
    else {
        product.reviews.push(review)
    }

    let averageRatings = 0;
    let sum = 0;

    product.reviews.forEach(rev => {
        sum += rev.rating;
    })
    product.reviewsCount = product.reviews.length

    averageRatings = sum / product.reviews.length

    product.ratings = averageRatings

    await product.save({
        validateBeforeSave: false
    })

    res.status(200).json({
        success: true,
        product
    })

})


const getAllReviewsForAProduct = handleAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.prod_id)
    if (!product) {
        return next(new ErrorHandler("Product not found", 400))
    }

    const reviews = product.reviews;
    const reviewsCount = product.reviewCount

    res.status(200).json({
        success: true,
        reviews,
        reviewsCount
    })

})


const deleteReview = handleAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.prod_id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 400))
    }

    const reviews = product.reviews.filter(review => {
        return review._id.toString() === req.query.review_id
    })

    let averageRatings = 0;
    let sum = 0;

    reviews.forEach(rev => {
        sum += rev.rating;
    })
    const reviewsCount = reviews.length

    averageRatings = sum / reviews.length

    const ratings = averageRatings


    await Product.findByIdAndUpdate(req.query.prod_id, {
        reviews,
        ratings,
        reviewsCount
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        msg: "Review deleted successfully"
    })

})



module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    createProductReview,
    getAllReviewsForAProduct,
    deleteReview,
    getAllProductsAdmin
}