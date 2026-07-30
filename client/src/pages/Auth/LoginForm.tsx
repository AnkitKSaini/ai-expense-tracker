import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  loginSchema,
  type LoginFormData,
} from "../../schemas/auth.schema";

import { useLogin } from "../../hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData,
  ) => {
    try {
      await loginMutation.mutateAsync(data);

 navigate("/dashboard", {
  replace: true,
});
    } catch {
      // Toast handled by hook
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
    >
      <h1 className="mb-6 text-center text-3xl font-bold">
        Login
      </h1>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
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
          autoComplete="current-password"
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
        disabled={loginMutation.isPending}
        className="
          w-full
          rounded-lg
          bg-blue-600
          py-3
          text-white
          transition-colors
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loginMutation.isPending
          ? "Logging in..."
          : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;