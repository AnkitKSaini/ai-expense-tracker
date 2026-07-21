import { Link } from "react-router-dom";
import { Mail, User } from "lucide-react";

import {
  AuthLayout,
  AuthHeader,
  PasswordInput,
  AuthDivider,
  SocialLogin,
} from "../../components/auth";

function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing your finances with AI."
    >
      <AuthHeader
        title="Register"
        subtitle="Create your AI Expense Tracker account."
      />

      <form className="mt-8 space-y-6">

        {/* Full Name */}
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
              className="
                w-full rounded-2xl border border-slate-300 bg-white/80
                py-3 pl-12 pr-4 outline-none transition-all
                focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20
                dark:border-slate-700 dark:bg-slate-900/70
              "
            />
          </div>
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
              className="
                w-full rounded-2xl border border-slate-300 bg-white/80
                py-3 pl-12 pr-4 outline-none transition-all
                focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20
                dark:border-slate-700 dark:bg-slate-900/70
              "
            />
          </div>
        </div>

        <PasswordInput
          label="Password"
          placeholder="Create a password"
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
        />

        <button
          type="submit"
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
          "
        >
          Create Account
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