import Notification from "../models/Notification.js";

export async function createNotification(
  data: any,
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
      new: true,
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