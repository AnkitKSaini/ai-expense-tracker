import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import goalRoutes from "./routes/goal.routes.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { env } from "./config/env.js";

const app = express();
app.set("trust proxy", 1);
// CORS
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Health Check
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Expense Tracker API is running 🚀",
  });
});

// Production Health Check
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api", routes);
app.use("/api/goal", goalRoutes);

// 404
app.use(notFoundMiddleware);

// Error
app.use(errorMiddleware);

export default app;