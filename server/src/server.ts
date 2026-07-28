import app from "./app.js";
import connectDatabase from "./config/database.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log("");
      console.log("====================================");
      console.log("🚀 AI Expense Tracker API");
      console.log(`✅ Server Started`);
      console.log(`🌍 Environment : ${env.NODE_ENV}`);
      console.log(`🛢️ Database : Connected`);
      console.log(`🔌 Port : ${env.PORT}`);
      console.log("====================================");
      console.log("");
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();