import { Link } from "react-router-dom";

import {
  AuthHeader,
  AuthLayout,
} from "../../components/auth";

function VerifyOTPPage() {
  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the verification code sent to your email."
    >
      <AuthHeader
        title="Email Verification"
        subtitle="We've sent a 6-digit verification code to your email."
      />

      <form className="mt-8 space-y-8">

        {/* OTP Inputs */}

        <div className="flex justify-center gap-3">

          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              inputMode="numeric"
              className="
                h-14
                w-14
                rounded-2xl
                border
                border-slate-300
                bg-white/80
                text-center
                text-xl
                font-bold
                outline-none
                transition-all
                focus:border-cyan-500
                focus:ring-4
                focus:ring-cyan-500/20
                dark:border-slate-700
                dark:bg-slate-900/70
                dark:text-white
              "
            />
          ))}

        </div>

        {/* Verify Button */}

        <button
          type="submit"
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
          "
        >
          Verify Code
        </button>

        {/* Resend */}

        <div className="text-center">

          <p className="text-sm text-slate-600 dark:text-slate-400">
            Didn't receive the code?
          </p>

          <button
            type="button"
            className="
              mt-2
              font-semibold
              text-cyan-600
              transition-colors
              hover:text-cyan-500
            "
          >
            Resend OTP (00:30)
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