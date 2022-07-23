const nodemailer = require('nodemailer')

const sendPasswordResetMail = async (data) => {
    const transporterObj = nodemailer.createTransport({
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS
        }
    })

    const options = {
        from: process.env.SMTP_EMAIL,
        to: data.email,
        subject: data.subject,
        text: data.message,
    }

    transporterObj.sendMail(options)

}

module.exports = sendPasswordResetMail