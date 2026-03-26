const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();
const Card = require("../models/cardModel");

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { name, description, image, category } = req.body;

      const findName = await Card.findOne({ name });

      if (findName) {
        return res.status(400).json({ message: "Card already exists" });
      }

      const createCard = await Card.create({
        name,
        description,
        image,
        category,
        createdBy: req.user._id,
      });

      res.status(201).json({ message: "Card craete successfully", createCard });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
);

router.get(
  "/getAllCard",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 1;
      const skip = (page - 1) * limit;
      const total = await Card.countDocuments();

      const find = await Card.find()
        .populate("createdBy", "name email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      res
        .status(200)
        .json({
          message: "Get all cards",
          find,
          total,
          page,
          pages: Math.ceil(total / limit),
        });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
);

router.get(
  "/getById/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const find = await Card.findById(id);
      if (!find) {
        return res.status(400).json({ message: "Card not found" });
      }

      res.status(200).json({ message: "Get card by id", find });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
);

router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      const deleteCard = await Card.findByIdAndDelete(id);
      res.status(200).json({ message: "Card delete successfully", deleteCard });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
);

router.patch(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { ...data } = req.body;

      const updateCard = await Card.findByIdAndUpdate(id, data, { new: true });

      if (!updateCard) {
        return res.status(400).json({ message: "Card not found" });
      }

      res.status(200).json({ message: "Card update successfully", updateCard });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
);

module.exports = router;
