import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  total: Number,
  userName: String,

  mobile: String,   // 🔥 ADD THIS
  address: String,  // 🔥 ADD THIS

  status: {
    type: String,
    default: "Pending",
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;