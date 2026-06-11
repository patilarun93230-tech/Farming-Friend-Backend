import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js"; // 🔥 ADD

const router = express.Router();

// 🔥 PROTECTED ROUTES
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.put("/:id", protect, updateOrderStatus);

export default router;