import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthHeader, AuthLayout, PasswordInput } from "../../components/auth";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../../schemas/auth.schema";

import { useResetPassword } from "../../hooks/useAuth";

import { getResetToken, removeResetToken } from "../../utils/resetToken";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const resetPasswordMutation = useResetPassword();

  const resetToken = getResetToken();

  const [isResetCompleted, setIsResetCompleted] = useState(false);

  useEffect(() => {
    if (!resetToken && !isResetCompleted) {
      navigate("/forgot-password", {
        replace: true,
      });
    }
  }, [resetToken, isResetCompleted, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!resetToken) return;

    try {
      await resetPasswordMutation.mutateAsync({
        resetToken,
        password: data.password,
      });

      setIsResetCompleted(true);

      removeResetToken();

      navigate("/login", {
        replace: true,
        state: {
          email,
        },
      });
    } catch {
      // Toast handled in hook
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new secure password for your account."
    >
      <AuthHeader
        title="Create New Password"
        subtitle="Your new password should be different from the previous one."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          registration={register("password")}
          error={errors.password}
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your new password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={resetPasswordMutation.isPending}
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
            disabled:opacity-70
          "
        >
          {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Back to{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-600 hover:text-cyan-500"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
