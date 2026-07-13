import { Schema, model, Types, Document } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  type: "Income" | "Expense";
  date: Date;
  notes?: string;

  user: Types.ObjectId;
}

const expenseSchema = new Schema<IExpense>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IExpense>("Expense", expenseSchema);
