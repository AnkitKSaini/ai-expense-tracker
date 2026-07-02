import express from "express";
import cors from "cors";

import routes from "./routes/index.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Expense Tracker API is running 🚀",
  });
});

// API Routes
app.use("/api", routes);

// 404 Middleware (Always after routes)
app.use(notFoundMiddleware);

// Error Middleware (Always last)
app.use(errorMiddleware);

export default app;