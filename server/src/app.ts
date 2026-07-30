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

// =========================
// Debug Logs
// =========================
console.log("======================================");
console.log("NODE_ENV:", env.NODE_ENV);
console.log("CLIENT_URL:", env.CLIENT_URL);
console.log("======================================");

// =========================
// Allowed Origins
// =========================
const allowedOrigins = [
  "https://ai-expense-tracker-two-phi.vercel.app",
  "https://ai-expense-tracker-afythmiy8-ankitksainis-projects.vercel.app",
  "https://ai-expense-tracker-git-main-ankitksainis-projects.vercel.app",
];

// =========================
// CORS
// =========================
app.use(
  cors({
    origin(origin, callback) {
      console.log("Incoming Origin:", origin);

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked Origin:", origin);

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  }),
);

// =========================
// Middlewares
// =========================
app.use(cookieParser());
app.use(express.json());

// =========================
// Health Check
// =========================
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Expense Tracker API is running 🚀",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// =========================
// Routes
// =========================
app.use("/api", routes);
app.use("/api/goal", goalRoutes);

// =========================
// 404
// =========================
app.use(notFoundMiddleware);

// =========================
// Error Handler
// =========================
app.use(errorMiddleware);

export default app;