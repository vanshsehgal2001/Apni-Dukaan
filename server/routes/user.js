const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeRole } = require('../middleware/auth')
const { updatePassword, logout, login, register, resetPassword, forgetPassword, getMyDetails,
    updateMe, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/user')

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/logout').post(logout)

router.route('/password/reset').post(forgetPassword)

router.route('/password/reset/:token').put(resetPassword)

router.route('/my').get(authenticateUser, getMyDetails)

router.route('/password/update').put(authenticateUser, updatePassword)

router.route('/my/update').put(authenticateUser, updateMe)

router.route('/admin/users').get(authenticateUser, authorizeRole('admin'), getAllUsers)

router.route('/admin/user/:user_id').get(authenticateUser, authorizeRole('admin'), getUser)
    .put(authenticateUser, authorizeRole('admin'), updateUser)
    .delete(authenticateUser, authorizeRole('admin'), deleteUser)
module.exports = router