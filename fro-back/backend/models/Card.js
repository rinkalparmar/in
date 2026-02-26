const mongoose = require("mongoose");

const Card = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    category: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Card", Card);
