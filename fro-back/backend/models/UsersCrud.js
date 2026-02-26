const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    address: String,
    mobile: { type: Number, unique: true },
    gender: String,
    hobbies: [String],
    city: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("MyUsers", Users);
