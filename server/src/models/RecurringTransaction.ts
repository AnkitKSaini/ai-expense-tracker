import { Schema, model, type InferSchemaType } from "mongoose";

const recurringTransactionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
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

    frequency: {
      type: String,
      enum: [
        "Daily",
        "Weekly",
        "Monthly",
        "Quarterly",
        "Yearly",
      ],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    nextRun: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    notes: {
      type: String,
      default: "",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

recurringTransactionSchema.index({
  user: 1,
  nextRun: 1,
});

export type RecurringTransactionDocument =
  InferSchemaType<
    typeof recurringTransactionSchema
  >;

export default model(
  "RecurringTransaction",
  recurringTransactionSchema,
);