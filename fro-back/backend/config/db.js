const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to database sucessfully");
  } catch (error) {
    console.log("failed to connect with database");
  }
};

module.exports = connectDB;
