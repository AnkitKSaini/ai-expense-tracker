import { Link } from "react-router-dom";

import {
  AuthHeader,
  AuthLayout,
  PasswordInput,
} from "../../components/auth";

function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new secure password for your account."
    >
      <AuthHeader
        title="Create New Password"
        subtitle="Your new password should be different from the previous one."
      />

      <form className="mt-8 space-y-6">

        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your new password"
        />

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
          Reset Password
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