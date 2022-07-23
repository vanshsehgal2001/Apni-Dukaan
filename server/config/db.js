const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(data => {
            console.log("Mongo DB connected")
        })

    //use when not handling promise rejection in server.js file
    // .catch(err => {
    //     console.log(err)
    // })
}

module.exports = connectDB