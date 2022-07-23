const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.message = error.message || "Internal Server Error"

    //mongodb cast error(invalid object id)
    if (error.name === 'CastError') {
        error = new ErrorHandler(`Resource not found. invalid : ${error.path}`, 400);
    }

    if (error.code === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`
        error = new ErrorHandler(message, 400);
    }

    if (error.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid";
        error = new ErrorHandler(message, 400)
    }

    if (error.name === "TokenExpiredError") {
        const message = "JSON Web Token expired";
        error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
        success: false,
        msg: error.message
    })

}