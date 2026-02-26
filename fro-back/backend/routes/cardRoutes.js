const express = require("express");
const Card = require("../models/Card");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const routes = express.Router();

routes.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { title, description, image, category } = req.body;

      const createCard = await Card.create({
        title,
        description,
        image,
        category,
        createdBy: req.user._id,
      });

      res.json({ message: "Card created successfully", createCard });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

routes.get("/getCard", async (req, res) => {
  try {
    const cards = await Card.find().populate("createdBy", "name email");
    res.json({ message: "Cards fetched successfully", cards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = routes;
