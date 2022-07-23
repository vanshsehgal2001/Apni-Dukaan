const express = require('express');
const authenticateUser = require('../middleware/auth').authenticateUser
const authorizeRole = require('../middleware/auth').authorizeRole
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct, createProductReview
    , getAllReviewsForAProduct, deleteReview, getAllProductsAdmin } = require('../controllers/product')

router.route("/products").get(getAllProducts)

router.route("/admin/products").get(authenticateUser, authorizeRole("admin"), getAllProductsAdmin)

router.route("/admin/product/create").post(authenticateUser, authorizeRole("admin"), createProduct)

router.route("/admin/product/:prod_id")
    .put(authenticateUser, authorizeRole("admin"), updateProduct)
    .delete(authenticateUser, authorizeRole("admin"), deleteProduct)


router.route("/product/:prod_id").get(getProduct)

router.route('/product/review').post(authenticateUser, createProductReview)

router.route('/reviews').get(getAllReviewsForAProduct)

router.route('/review').delete(authenticateUser, deleteReview)

module.exports = router;