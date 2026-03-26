const express = require("express");
const router = express.Router();
const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    res.status(201).json({ message: "User create successfully", user });
  } catch {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, existUser.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        _id: existUser._id,
        role: existUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      },
    );

    res.status(200).json({ message: "Login successfully", token, existUser });
  } catch {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.post("/changePassword", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const findUser = await User.findById(req.user._id);

    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password not match" });
    }

    const newPass = await bcrypt.hash(newPassword, 10);
    findUser.password = newPass;
    await findUser.save();
    res.status(200).json({ message: "Password change successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
