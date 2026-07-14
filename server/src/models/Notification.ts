import {
  Schema,
  model,
  type InferSchemaType,
} from "mongoose";

const notificationSchema =
  new Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        enum: [
          "Expense",
          "Budget",
          "Goal",
          "Investment",
          "Recurring",
          "Bill",
          "AI",
          "System",
        ],
        required: true,
      },

      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
        ],
        default: "Medium",
      },

      isRead: {
        type: Boolean,
        default: false,
      },

      actionUrl: {
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

notificationSchema.index({
  user: 1,
  createdAt: -1,
});

notificationSchema.index({
  user: 1,
  isRead: 1,
});

export type NotificationDocument =
  InferSchemaType<
    typeof notificationSchema
  >;

export default model(
  "Notification",
  notificationSchema,
);