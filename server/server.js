const express = require('express')
// const dotenv = 
const db = require('./config/db')
const product = require('./routes/product')
const user = require('./routes/user')
const order = require('./routes/order')
const payment = require('./routes/payment')
const errorMiddleware = require('./middleware/Error')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express();
const path = require('path')
// const razorpay = require('razorpay')

//uncaught exception (like using undefined names in the code)
process.on("uncaughtException", error => {
    console.log(`Error : ${error.message}`)
    process.exit(1)
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: "server/config/config.env" })
}

db()

app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
const options = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
}
// export const instance = new razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_SECRET
// })
cloudinary.config(options)
app.use('/api', product);
app.use('/api', user)
app.use('/api', order)
app.use('/api', payment)
app.use(errorMiddleware)

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT ${process.env.PORT}`);
})

//unhandled promise rejection

process.on("unhandledRejection", error => {
    console.log(`Error : ${error.message}`)

    server.close(() => {
        process.exit(1)
    })
})