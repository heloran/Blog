require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
        });
        console.log(`MongoDB connected successfully`);
    }catch (err) {
        console.error(`Database connection failed:`, err.message);
        process.exit(1);
    }
};

module.exports = connectDB;