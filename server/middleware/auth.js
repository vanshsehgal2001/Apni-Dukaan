const handleAsyncErrors = require('../middleware/AsyncErrors')
const ErrorHandler = require('../utils/ErrorHandler')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateUser = handleAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies


    if (!token) {
        return next(new ErrorHandler("Please login first", 401))
    }

    const data = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(data.id)
    next()
})

const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler("User not authorized to access this resource", 401))
        }
        next();
    }
}

module.exports = { authenticateUser, authorizeRole }