import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as userService from "../services/user.service";
import toast from "react-hot-toast";

export function useProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: userService.getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: userService.updateProfile,

    onSuccess: () => {
      toast.success("Profile updated");

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: () => {
      toast.error("Profile update failed");
    },
  });

  return {
    profile: profileQuery.data?.data,
    loading: profileQuery.isPending,
    updateProfile: updateMutation.mutateAsync,
  };
}
