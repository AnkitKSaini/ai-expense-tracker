import Notification, {
  type NotificationDocument,
} from "../models/Notification.js";

interface CreateNotificationData
  extends Omit<
    NotificationDocument,
    "user" | "isRead" | "createdAt" | "updatedAt"
  > {}

export async function createNotification(
  data: CreateNotificationData,
  userId: string,
) {
  return Notification.create({
    ...data,
    user: userId,
  });
}

export async function getNotifications(
  userId: string,
) {
  return Notification.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
}

export async function markAsRead(
  id: string,
  userId: string,
) {
  return Notification.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    {
      isRead: true,
    },
    {
      returnDocument: "after",
    },
  );
}

export async function markAllAsRead(
  userId: string,
) {
  return Notification.updateMany(
    {
      user: userId,
      isRead: false,
    },
    {
      isRead: true,
    },
  );
}

export async function deleteNotification(
  id: string,
  userId: string,
) {
  return Notification.findOneAndDelete({
    _id: id,
    user: userId,
  });
}

export async function deleteReadNotifications(
  userId: string,
) {
  return Notification.deleteMany({
    user: userId,
    isRead: true,
  });
}