const express = require("express");
const User = require("../Model/User");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

// Registration
exports.Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
      return res.status(400).json({
        Status: "Failed",
        Message: "Please provide username, email, and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        Status: "Failed",
        Message: "This account is already created",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    let cart = {};
    for (let i = 1; i <= 300; i++) {
      cart[i] = 0;
    }
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      cartdata: cart,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, "qwerty12345", {
      expiresIn: "90d",
    });
    res.status(200).json({
      Status: "Success",
      Message: "Account has been created",
      UserName: username,
      Token: token,
      cartdata: cart,
    });
  } catch (error) {
    console.error("Error while creating account:", error);
    res.status(400).json({
      Status: "Failed",
      Message: "Failure while creating account",
    });
  }
};

// Login
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({
        Status: "Failed",
        Message: "please provide EMAIL and PASSWORD",
      });
    }

    if (!user) {
      return res.status(401).json({
        Status: "Failed",
        Message: "User Not Found With This Email Id",
      });
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(402).json({
        Status: "Failed",
        Message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ id: user._id }, "qwerty12345", {
      expiresIn: "90d",
    });

    res.status(200).json({
      Status: "Success",
      Message: "Login  SuccessFull",
      username: user.username,
      Data: token,
      cartdata: user.cartdata,
      purchaseHistory: user.purchaseHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Status: "Failed",
      Message: "Failure While Login Account",
    });
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.endsWith(".com");
};

exports.updateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        Status: "Failed",
        Message:
          "Invalid email format. Please use a valid email ending with .com",
      });
    }

    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({
        Status: "Failed",
        Message: "User Not Found",
      });
    }

    user.email = email;

    await user.save();

    res.status(200).json({
      Status: "Success",
      Message: "Email Updated Successfully",
      Data: {
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      Status: "Failed",
      Message: "An error occurred",
      Error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.protect = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).send({
      Status: "Failed",
      Message: "Please Login To Continue",
    });
  } else {
    try {
      const data = jwt.verify(token, "qwerty12345");
      req.user = data;
      next();
    } catch (error) {
      console.log(error);
    }
  }
};
