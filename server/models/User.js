const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
        maxLength: [40, 'Name can"t be more than 40 chars long'],
        minLength: [3, 'Name should be more than 3 characters long']
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [8, "Password should be at least 8 characters long"],
        select: false
    },
    image: {
        img_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpiryDate: Date
})


//hash the password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})


//jwt token
UserSchema.methods.jwtToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
    return token
}


//check passwords match
UserSchema.methods.comparePasswords = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}


//reset password
UserSchema.methods.resetPassword = function () {
    const token = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

    this.resetPasswordExpiryDate = Date.now() + 15 * 3600 * 1000;

    return token;

}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel