const express = require('express');
const authenticateUser = require('../middleware/auth').authenticateUser
const authorizeRole = require('../middleware/auth').authorizeRole
const router = express.Router();
const { createOrder, getOrder, getMyOrders, getOrders, updateOrder, deleteOrder } = require('../controllers/order')


router.route("/order/create").post(authenticateUser, createOrder)

router.route("/orders/my").get(authenticateUser, getMyOrders)

router.route("/order/:order_id").get(authenticateUser, getOrder)

router.route("/admin/orders").get(authenticateUser, authorizeRole("admin"), getOrders)

router.route("/admin/order/:order_id").put(authenticateUser, authorizeRole("admin"), updateOrder)
    .delete(authenticateUser, authorizeRole("admin"), deleteOrder)


module.exports = router