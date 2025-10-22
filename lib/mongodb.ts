import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // Add to .env.local

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable inside .env.local");
}

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return; // Already connected

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB Already Connected:", db.connection.name);
    return ;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDB;