import { Schema, model } from "mongoose";

const budgetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Budget", budgetSchema);