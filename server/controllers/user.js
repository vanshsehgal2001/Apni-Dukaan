const ErrorHandler = require('../utils/ErrorHandler')
const handleAsyncErrors = require('../middleware/AsyncErrors')
const User = require('../models/User')
const sendToken = require('../utils/SendToken')
const sendPasswordResetMail = require('../utils/SendMail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

const register = handleAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body
    const cloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "images",
        // width: 150,
        // crop: "scale"
    })
    const userObj = {
        name,
        email,
        password,
        image: {
            img_id: cloud.public_id,
            url: cloud.secure_url
        }
    }

    const user = await User.create(userObj)

    sendToken(user, 201, res)

})


const login = handleAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 401))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isMatch = await user.comparePasswords(password)

    if (!isMatch) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)
})

const logout = handleAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        msg: "Logged out successfully"
    })
})


const forgetPassword = handleAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler("User not found", 401))
    }

    const token = user.resetPassword();

    await user.save({ validateBeforeSave: false })

    const resetURL = `${req.protocol}://${req.get("host")}/password/reset/${token}`

    const message = `Click on this URL to reset the Password : \n ${resetURL}`


    try {

        await sendPasswordResetMail({
            email: user.email,
            subject: "Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent successfully to ${user.email}`
        })


    } catch (error) {
        user.resetPasswordExpiryDate = undefined;
        user.resetPasswordToken = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))

    }

})


const resetPassword = handleAsyncErrors(async (req, res, next) => {
    const resetToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpiryDate: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid/expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password don't match", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpiryDate = undefined

    await user.save();

    sendToken(user, 200, res)

})


const getMyDetails = handleAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})


const updatePassword = handleAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    const isMatch = await user.comparePasswords(req.body.oldPassword)

    if (!isMatch) {
        return next(new ErrorHandler("Old Password is incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords don't match", 400))
    }

    user.password = req.body.newPassword;

    await user.save()

    sendToken(user, 200, res)


})


const updateMe = handleAsyncErrors(async (req, res, next) => {
    const userDetails = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.body.image !== '') {
        const user = await User.findById(req.user.id)

        const img_id = user.image.img_id

        await cloudinary.v2.uploader.destroy(img_id)

        const cloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "images",
            width: 150,
            crop: "scale"
        })

        userDetails.image = {
            img_id: cloud.public_id,
            url: cloud.secure_url
        }

    }

    const user = await User.findByIdAndUpdate(req.user.id, userDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})



//admin
const getAllUsers = handleAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})



//admin
const getUser = handleAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.user_id);

    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }

    res.status(200).json({
        success: true,
        user
    })
})


//update user -- admin
const updateUser = handleAsyncErrors(async (req, res, next) => {

    let user = await User.findById(req.params.user_id);

    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }

    const userDetails = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    user = await User.findByIdAndUpdate(req.params.user_id, userDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})


//delete user --admin
const deleteUser = handleAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.user_id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }

    const img_id = user.image.img_id

    await cloudinary.v2.uploader.destroy(img_id)

    await user.remove();
    res.status(200).json({
        success: true,
        msg: "User deleted successfully"
    })
})


module.exports = {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword,
    getMyDetails,
    updatePassword,
    updateMe,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}