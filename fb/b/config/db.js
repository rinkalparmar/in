const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connection successfully set");
  } catch (error) {
    console.log("connection failed set");
  }
};

module.exports = connectDB;
