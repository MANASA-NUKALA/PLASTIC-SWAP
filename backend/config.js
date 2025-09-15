// backend/config.js
require('dotenv').config();
const mongoose = require('mongoose');

const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/plastic-swap';
const port = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, jwtSecret, mongoURI, port };
