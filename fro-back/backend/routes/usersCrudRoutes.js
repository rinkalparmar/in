const express = require("express");
const Users = require("../models/UsersCrud");
const routes = express.Router();
const authmiddleware = require("../middleware/authMiddleware");
const rolemiddleware = require("../middleware/roleMiddleware");

routes.post(
  "/create",
  authmiddleware,
  rolemiddleware(["admin"]),
  async (req, res) => {
    try {
      const { name, email, address, mobile, gender, hobbies, city } = req.body;

      const find = await Users.findOne({ email });
      if (find) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = await Users.create({
        name,
        email,
        address,
        mobile,
        gender,
        hobbies,
        city,
      });

      res.json({ message: "User created successfully", newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

routes.get(
  "/get",
  authmiddleware,
  rolemiddleware(["admin"]),
  async (req, res) => {
    try {
      const users = await Users.find();
      res.json({ message: "Users fetched successfully", users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

routes.delete(
  "/delete/:id",
  authmiddleware,
  rolemiddleware(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      const deleteUser = await Users.findByIdAndDelete(id);

      return res.json({ message: "User deleted successfully", deleteUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

routes.patch(
  "/update/:id",
  authmiddleware,
  rolemiddleware(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { ...data } = req.body;

      const updateUser = await Users.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });

      if (!updateUser) {
        return res.status(400).json({ message: "User not found" });
      }
      return res.json({ message: "User updated successfully", updateUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

module.exports = routes;
