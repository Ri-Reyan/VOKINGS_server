import mongoose from "mongoose";

const Database = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default Database;
