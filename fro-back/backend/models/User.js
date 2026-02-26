const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: { type: Number, unique: true },
    gender: String,
    hobbies: [String],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", User);
