const mongoose = require("mongoose");

const Auth = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Auth", Auth);
