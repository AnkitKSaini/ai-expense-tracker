import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  avatar: string;

  role: "user" | "admin";

  provider: "local" | "google" | "github";

  emailVerified: boolean;

  refreshToken?: string;

  otp?: string;
  otpExpiry?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: "",
    },

    otp: {
      type: String,
      default: "",
    },

    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>("User", userSchema);