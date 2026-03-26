const Users = require("../models/userModel");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/createUser",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { name, email, addres, mobile, gender, hobbies } = req.body;

      const findEmial = await Users.findOne({ email });

      if (findEmial) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await Users.create({
        name,
        email,
        addres,
        mobile,
        gender,
        hobbies,
        createdBy: req.user._id,
      });

      res.status(201).json({ message: "User craete successfully", user });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
);

router.get(
  "/getAllUsers",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;
      const total = await Users.countDocuments();

      const find = await Users.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      res
        .status(200)
        .json({
          message: "Get all users",
          find,
          page,
          total,
          totalPages: Math.ceil(total / limit),
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
      const find = await Users.findById(id);
      if (!find) {
        return res.status(400).json({ message: "user not found" });
      }

      res.status(200).json({ message: "Get user by id", find });
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

      const deleteUser = await Users.findByIdAndDelete(id);
      res.status(200).json({ message: "user delete successfully", deleteUser });
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

      const updateUser = await Users.findByIdAndUpdate(id, data, { new: true });

      if (!updateUser) {
        return res.status(400).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User update successfully", updateUser });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
);

module.exports = router;
