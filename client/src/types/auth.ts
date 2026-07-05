export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  avatar?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}