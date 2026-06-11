import Order from "../models/Order.js";

// ================= 🛒 CREATE ORDER =================
export const createOrder = async (req, res) => {
  try {
    const { items, total, userName, mobile, address } = req.body;

    // validation
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!userName || !mobile || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    const order = await Order.create({
      items,
      total,
      userName,
      mobile,
      address,
    });

    res.status(201).json({
      message: "Order placed successfully ✅",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= 📦 GET ALL ORDERS =================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= 🔄 UPDATE ORDER STATUS =================
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // check valid status
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated ✅",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};