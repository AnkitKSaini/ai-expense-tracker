import { Link, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AuthLayout,
  AuthHeader,
  PasswordInput,
  AuthDivider,
  SocialLogin,
} from "../../components/auth";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/auth.schema";

import { useRegister } from "../../hooks/useAuth";

function RegisterPage() {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);

      navigate("/dashboard", {
        replace: true,
      });
    } catch {
      // Toast handled in hook
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

      <form
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
      >
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
              autoComplete="name"
              placeholder="Enter your full name"
              {...register("name")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-white/80
                py-3
                pl-12
                pr-4
                outline-none
                transition-all
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
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...register("email")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-white/80
                py-3
                pl-12
                pr-4
                outline-none
                transition-all
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

        {/* Password */}
        <PasswordInput
          label="Password"
          placeholder="Create a password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="
            w-full
            rounded-2xl
            bg-linear-to-r
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
            disabled:opacity-60
          "
        >
          {registerMutation.isPending
            ? "Creating Account..."
            : "Create Account"}
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
