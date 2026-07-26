const TOKEN_KEY = "accessToken";

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem("resetToken");
};