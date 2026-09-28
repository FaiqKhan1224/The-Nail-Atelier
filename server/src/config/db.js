const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env");
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`[Nail Atelier] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Nail Atelier] MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;