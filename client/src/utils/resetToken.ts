const RESET_TOKEN_KEY = "resetToken";

export const saveResetToken = (
  token: string,
) => {
  sessionStorage.setItem(
    RESET_TOKEN_KEY,
    token,
  );
};

export const getResetToken = () => {
  return sessionStorage.getItem(
    RESET_TOKEN_KEY,
  );
};

export const removeResetToken = () => {
  sessionStorage.removeItem(
    RESET_TOKEN_KEY,
  );
};