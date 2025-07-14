import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // Re-throw the error to handle it in the calling context
  }
};

export default db;
