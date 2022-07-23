const sendToken = (user, code, res) => {
    const token = user.jwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRESIN * 24 * 3600 * 1000
        ),
        httpOnly: true
    }

    res.status(code).cookie("token", token, options).json({
        success: true,
        user,
        token
    })

}

module.exports = sendToken