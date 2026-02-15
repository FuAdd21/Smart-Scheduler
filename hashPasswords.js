import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js"; // adjust path if needed

dotenv.config();

// Connect to MongoDB (Mongoose 7+ no options needed)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function hashPlainPasswords() {
  try {
    const users = await User.find(); // get all users

    for (let user of users) {
      // simple check: if password length < 20, assume it's plain text
      if (user.password.length < 20) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        console.log(`Password hashed for: ${user.email}`);
      }
    }

    console.log("All plain text passwords hashed!");
    process.exit(0);
  } catch (error) {
    console.error("Error hashing passwords:", error);
    process.exit(1);
  }
}

hashPlainPasswords();
