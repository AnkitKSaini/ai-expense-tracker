import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginSchema, type LoginFormData } from "./login.schema";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

      await login(data.email, data.password);

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
      <h1 className="text-3xl font-bold mb-6 text-center">
        Login
      </h1>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border rounded-lg p-3"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border rounded-lg p-3"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;