import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { notificationService } from "../services/notification.service";

export function useNotifications() {
  const queryClient = useQueryClient();

  const notificationQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.getAll,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });

  const markRead = useMutation({
    mutationFn: notificationService.markRead,

    onSuccess() {
      toast.success("Marked as read.");

      invalidate();
    },
  });

  const markAllRead = useMutation({
    mutationFn: notificationService.markAllRead,

    onSuccess() {
      toast.success("All notifications marked as read.");

      invalidate();
    },
  });

  const deleteNotification = useMutation({
    mutationFn: notificationService.delete,

    onSuccess() {
      toast.success("Notification deleted.");

      invalidate();
    },
  });

  const deleteRead = useMutation({
    mutationFn: notificationService.deleteRead,

    onSuccess() {
      toast.success("Read notifications deleted.");

      invalidate();
    },
  });

  return {
    notifications: notificationQuery.data ?? [],

    loading: notificationQuery.isLoading,

    error: notificationQuery.isError,

    refetch: notificationQuery.refetch,

    markRead: markRead.mutateAsync,

    markAllRead: markAllRead.mutateAsync,

    deleteNotification: deleteNotification.mutateAsync,

    deleteRead: deleteRead.mutateAsync,
  };
}
