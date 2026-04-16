const mongoose = require("mongoose")

async function connectDB () {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database Successfully");
    } catch (err) {
        console.error("Failed to connect to DB",err);
    }
}

module.exports = connectDB;