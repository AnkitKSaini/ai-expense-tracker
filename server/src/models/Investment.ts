import { Schema, model, type InferSchemaType } from "mongoose";

const investmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    symbol: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },

    type: {
      type: String,
      enum: [
        "Stock",
        "Mutual Fund",
        "SIP",
        "ETF",
        "Gold",
        "Crypto",
        "FD",
        "PPF",
        "NPS",
        "Real Estate",
        "Bond",
        "Other",
      ],
      required: true,
    },

    investedAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    currentValue: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    purchaseDate: {
      type: Date,
      required: true,
    },

    platform: {
      type: String,
      trim: true,
      default: "",
    },

    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },

    status: {
      type: String,
      enum: ["Active", "Sold"],
      default: "Active",
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
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

investmentSchema.index({
  user: 1,
  type: 1,
});

investmentSchema.index({
  user: 1,
  status: 1,
});

investmentSchema.index({
  user: 1,
  purchaseDate: -1,
});

investmentSchema.virtual("profit").get(function () {
  return this.currentValue - this.investedAmount;
});

investmentSchema.virtual("roi").get(function () {
  if (this.investedAmount === 0) return 0;

  return (
    ((this.currentValue - this.investedAmount) /
      this.investedAmount) *
    100
  );
});

investmentSchema.set("toJSON", {
  virtuals: true,
});

investmentSchema.set("toObject", {
  virtuals: true,
});

export type InvestmentDocument =
  InferSchemaType<typeof investmentSchema>;

const Investment = model(
  "Investment",
  investmentSchema,
);

export default Investment;