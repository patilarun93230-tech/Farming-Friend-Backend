import User from "../models/User.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, mobile, password, role, experience } = req.body;

    if (!firstName || !lastName || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ mobile });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      mobile,
      password,
      role,
      experience, // 🔥 IMPORTANT (for VC feature)
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ mobile });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 TOKEN GENERATE
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      message: "Login successful",
      token, // 🔥 ADD THIS
      user: userData,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= 👨‍🌾 EXPERIENCED FARMERS =================
export const getExperiencedFarmers = async (req, res) => {
  try {
    const farmers = await User.find({
      role: "farmer",
      experience: "experienced", // 🔥 filter
    }).select("-password");

    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};