import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./libs";

dotenv.config();

if (!process.env.PORT) {
  console.error("PORT is not defined in the environment variables.");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000 ;

// Middleware
app.use(express.json());

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  // Close database connection or other resources here
  process.exit(0);
});
