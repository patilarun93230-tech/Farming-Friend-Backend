import Product from "../models/Product.js";

// ➕ Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, distributor, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const product = await Product.create({
      name,
      price,
      distributor,
      image, // 🔥 ADD THIS
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};