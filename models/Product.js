import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  distributor: String,
  image: String, // 🔥 ADD THIS LINE
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;