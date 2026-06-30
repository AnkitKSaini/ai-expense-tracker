import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import expenseRoutes from "./routes/expense.routes.js";




const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.use("/api/expenses", expenseRoutes);

// Health Check Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Expense Tracker API is running 🚀",
  });
});

export default app;