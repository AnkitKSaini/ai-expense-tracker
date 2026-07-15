import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

import connectDatabase from "../config/database.js";
import User from "../models/User.js";
import Expense from "../models/Expense.js";

import { generateExpense } from "../generators/expenseFactory.js";

const TOTAL_EXPENSES = 1000;

async function seed() {
  try {
    console.log("🚀 Connecting to database...");

    await connectDatabase();

    console.log("✅ Database Connected");

    let demoUser = await User.findOne({
      email: "demo@example.com",
    });

    if (!demoUser) {
      const hashedPassword = await bcrypt.hash(
        "Demo@123",
        10,
      );

      demoUser = await User.create({
        name: "Demo User",
        email: "demo@example.com",
        password: hashedPassword,
      });

      console.log("👤 Demo user created");
    } else {
      console.log("👤 Demo user already exists");
    }

    await Expense.deleteMany({
      user: demoUser._id,
    });

    console.log("🗑 Old demo expenses deleted");

    const expenses = [];

    for (let i = 0; i < TOTAL_EXPENSES; i++) {
      const expense = generateExpense();

      expenses.push({
        ...expense,

        // Fix enum values
        type:
          expense.type.toLowerCase() === "Income"
            ? "Income"
            : "Expense",

        user: demoUser._id,
      });
    }

    await Expense.insertMany(expenses);

    console.log(
      `✅ ${TOTAL_EXPENSES} expenses inserted successfully`,
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Failed");
    console.error(error);

    process.exit(1);
  }
}

seed();