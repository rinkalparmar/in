const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    gender: String,
    address: String,
    mobile: { type: String, max: 10 },
    hobbies: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Users", Users);
