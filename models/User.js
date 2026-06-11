import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,

  // 🔥 ADD THIS
  experience: String,
  land: String,
});

const User = mongoose.model("User", userSchema);

export default User;