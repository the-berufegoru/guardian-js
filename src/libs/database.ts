import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<void> => {
  const dbUri = process.env.MONGO_URI;

  if (!dbUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(dbUri, {});
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};
