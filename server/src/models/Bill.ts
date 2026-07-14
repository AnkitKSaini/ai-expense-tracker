import {
  Schema,
  model,
  type InferSchemaType,
} from "mongoose";

const billSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    reminderDays: {
      type: Number,
      default: 3,
      min: 0,
      max: 30,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Overdue",
        "Skipped",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Card",
        "Bank Transfer",
        "Wallet",
        "Other",
      ],
      default: "UPI",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    autoCreateExpense: {
      type: Boolean,
      default: true,
    },

    paidAt: {
      type: Date,
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

billSchema.index({
  user: 1,
  dueDate: 1,
});

billSchema.index({
  user: 1,
  status: 1,
});

export type BillDocument =
  InferSchemaType<typeof billSchema>;

export default model(
  "Bill",
  billSchema,
);