import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";

import { useLogin } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";
import { saveToken } from "../../utils/token";

function LoginForm() {
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const loginMutation = useLogin();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await loginMutation.mutateAsync(data);

      saveToken(response.accessToken);

      setUser(response.user);

      toast.success("Login Successful 🎉");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid Email or Password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
    >
      <h1 className="mb-6 text-center text-3xl font-bold">
        Login
      </h1>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full rounded-lg border p-3"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full rounded-lg border p-3"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || loginMutation.isPending}
        className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading || loginMutation.isPending
          ? "Logging in..."
          : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;