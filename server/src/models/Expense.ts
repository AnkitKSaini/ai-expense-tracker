import { Schema, model, Types, Document } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: Date;
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
      enum: ["income", "expense"],
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IExpense>("Expense", expenseSchema);