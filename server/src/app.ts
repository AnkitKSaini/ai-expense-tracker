import express from "express";
import cors from "cors";
import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.use("/api", routes);


// Health Check Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Expense Tracker API is running 🚀",
  });
});

export default app;