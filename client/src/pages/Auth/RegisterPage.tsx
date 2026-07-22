import { Link, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  AuthLayout,
  AuthHeader,
  PasswordInput,
  AuthDivider,
  SocialLogin,
} from "../../components/auth";

import { registerSchema } from "../../schemas/auth.schema";
import type { RegisterFormData } from "../../types/auth";
import { authService } from "../../services/auth.service";
import { saveToken } from "../../utils/token";
import { useAuthContext } from "../../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await authService.register(data);

      saveToken(res.data.data.accessToken);

      setUser(res.data.data.user);
      
      toast.success("Account created successfully");

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Registration failed");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing your finances with AI."
    >
      <AuthHeader
        title="Register"
        subtitle="Create your AI Expense Tracker account."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* Name */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
              className="
                w-full rounded-2xl border border-slate-300 bg-white/80
                py-3 pl-12 pr-4 outline-none
                focus:border-cyan-500
                focus:ring-4
                focus:ring-cyan-500/20
                dark:border-slate-700
                dark:bg-slate-900/70
              "
            />
          </div>

          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="
                w-full rounded-2xl border border-slate-300 bg-white/80
                py-3 pl-12 pr-4 outline-none
                focus:border-cyan-500
                focus:ring-4
                focus:ring-cyan-500/20
                dark:border-slate-700
                dark:bg-slate-900/70
              "
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <PasswordInput
          label="Password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full rounded-2xl
            bg-gradient-to-r
            from-blue-600
            via-cyan-500
            to-violet-600
            py-3
            font-semibold
            text-white
            transition-all
            hover:scale-[1.02]
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        <AuthDivider />

        <SocialLogin />

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-600 hover:text-cyan-500"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
