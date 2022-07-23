const express = require('express');
const { paymentIntegration, paymentVerification, getKey } = require('../controllers/payment')
const router = express.Router()
const authenticateUser = require('../middleware/auth').authenticateUser


router.route("/payment").post(authenticateUser, paymentIntegration)
router.route("/paymentverification").post(authenticateUser, paymentVerification)
router.route('/getkey').get(authenticateUser, getKey)

module.exports = router