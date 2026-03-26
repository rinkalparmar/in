const mongoose = require("mongoose");

const Auth = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user", enum: ["user", "admin"] },
    //  password: {
    //   type: String,
    //   validate: {
    //     validator: function (value) {
    //       const startWith = /^[A-Z]/.test(value); // ✔ starts with uppercase
    //       const number = /[0-9]/.test(value);     // ✔ contains number
    //       const specialChar = /[!@#$%^&*]/.test(value); // ✔ special char
    //       const len = value.length === 6;         // ✔ length 6

    //       return startWith && number && specialChar && len;
    //     },
    //     message:
    //       "Password must start with uppercase, include number & special char, and be 6 characters long",
    //   },
    // }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Auth", Auth);
