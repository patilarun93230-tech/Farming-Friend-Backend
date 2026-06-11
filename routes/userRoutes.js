import express from "express";
import {
  registerUser,
  loginUser,
  getExperiencedFarmers,
} from "../controllers/userController.js";

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// 👨‍🌾 Experienced Farmers
router.get("/experienced", getExperiencedFarmers);

export default router;