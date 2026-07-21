import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  AuthLayout,
  AuthHeader,
  AuthDivider,
  SocialLogin,
} from "../../components/auth";

import { TextInput, PasswordInput } from "../../components/form";

import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";

import { useLogin } from "../../hooks/useAuth";
import { saveToken } from "../../utils/token";
import { useAuthContext } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      saveToken(response.accessToken);

      setUser(response.user);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue managing your finances."
    >
      <AuthHeader
        title="Login"
        subtitle="Access your AI Expense Tracker account."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <TextInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={<Mail size={18} />}
          registration={register("email")}
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          registration={register("password")}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-slate-300" />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-500"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            via-cyan-500
            to-violet-600
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {loginMutation.isPending ? "Signing In..." : "Sign In"}
        </button>

        <AuthDivider />

        <SocialLogin />

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-600 hover:text-cyan-500"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
