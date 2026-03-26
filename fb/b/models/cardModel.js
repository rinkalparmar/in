const mongoose = require("mongoose");

const Card = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    category: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Card", Card);
