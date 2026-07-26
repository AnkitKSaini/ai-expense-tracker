import { Link, useLocation, useNavigate } from "react-router-dom";
import { OTPInput, type SlotProps } from "input-otp";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthHeader, AuthLayout } from "../../components/auth";

import {
  verifyOTPSchema,
  type VerifyOTPFormData,
} from "../../schemas/auth.schema";

import { useForgotPassword, useVerifyOTP } from "../../hooks/useAuth";

function Slot(props: SlotProps) {
  return (
    <div
      className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        border
        border-slate-300
        bg-white/80
        text-center
        text-xl
        font-bold
        dark:border-slate-700
        dark:bg-slate-900/70
        dark:text-white
      "
    >
      {props.char ?? ""}
    </div>
  );
}

function VerifyOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const verifyOTPMutation = useVerifyOTP();

  const { mutateAsync: resendOTP, isPending: resendLoading } =
    useForgotPassword();

  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", {
        replace: true,
      });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const { register, handleSubmit, setValue, watch } =
    useForm<VerifyOTPFormData>({
      resolver: zodResolver(verifyOTPSchema),
      defaultValues: {
        email,
        otp: "",
      },
    });

  const onSubmit = async (data: VerifyOTPFormData) => {
    try {
      await verifyOTPMutation.mutateAsync(data);

      navigate("/reset-password", {
  replace: true,
  state: {
    email,
  },
});
    } catch {
      // Toast handled in hook
    }
  };

  const handleResendOTP = async () => {
    if (!email || countdown > 0) return;

    try {
      await resendOTP(email);

      setCountdown(60);
    } catch {
      // Toast handled in hook
    }
  };

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the verification code sent to your email."
    >
      <AuthHeader
        title="Email Verification"
        subtitle="We've sent a 6-digit verification code to your email."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
        <div className="flex justify-center">
          <OTPInput
            maxLength={6}
            value={watch("otp")}
            onChange={(value) => setValue("otp", value)}
            render={({ slots }) => (
              <div className="flex gap-3">
                {slots.map((slot, index) => (
                  <Slot key={index} {...slot} />
                ))}
              </div>
            )}
          />
        </div>

        <input type="hidden" {...register("email")} />

        <button
          type="submit"
          disabled={verifyOTPMutation.isPending}
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
          {verifyOTPMutation.isPending ? "Verifying..." : "Verify Code"}
        </button>

        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Didn't receive the code?
          </p>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={countdown > 0 || resendLoading}
            className="
              mt-2
              font-semibold
              text-cyan-600
              transition-colors
              hover:text-cyan-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {countdown > 0
              ? `Resend OTP (00:${String(countdown).padStart(2, "0")})`
              : resendLoading
                ? "Sending..."
                : "Resend OTP"}
          </button>
        </div>

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

export default VerifyOTPPage;
