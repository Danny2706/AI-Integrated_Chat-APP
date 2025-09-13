const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`server connected to DB.${conn.connection.host}`)
    } catch(err) {
        console.log(`Server Error.`,err)
    }
}

module.exports = connectDB