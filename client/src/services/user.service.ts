import api from "../api/api";

export const getProfile = async () => {
  const { data } = await api.get("/user/profile");
  return data;
};

 export const updateProfile = async (
  profile: {
    name: string;
    avatar?: FileList;
  }
) => {
  const formData = new FormData();

  formData.append("name", profile.name);

  if (
    profile.avatar &&
    profile.avatar.length > 0
  ) {
    formData.append(
      "avatar",
      profile.avatar[0]
    );
  }

  const { data } = await api.put(
    "/user/profile",
    formData
  );

  return data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const { data } = await api.put("/user/change-password", {
    currentPassword,
    newPassword,
  });

  return data;
};
