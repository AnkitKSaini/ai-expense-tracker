import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AuthHeader,
  AuthLayout,
} from "../../components/auth";

import { TextInput } from "../../components/form";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../schemas/auth.schema";

import { useForgotPassword } from "../../hooks/useAuth";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const forgotPasswordMutation =
    useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } =
    useForm<ForgotPasswordFormData>({
      resolver: zodResolver(
        forgotPasswordSchema,
      ),
    });

  const onSubmit = async (
    data: ForgotPasswordFormData,
  ) => {
    try {
      await forgotPasswordMutation.mutateAsync(data);

      navigate("/verify-otp", {
        replace: true,
        state: {
          email: data.email,
        },
      });
    } catch {
      // Toast handled in hook
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Reset your password securely."
    >
      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your email and we'll send you a verification code."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-6"
      >
        <TextInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={<Mail size={18} />}
          registration={register("email")}
          error={errors.email}
        />

        <button
          type="submit"
          disabled={
            forgotPasswordMutation.isPending
          }
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
            hover:scale-[1.02]
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {forgotPasswordMutation.isPending
            ? "Sending..."
            : "Send Verification Code"}
        </button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Remember your password?{" "}
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

export default ForgotPasswordPage;