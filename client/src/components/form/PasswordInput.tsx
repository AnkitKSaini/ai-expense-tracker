import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface PasswordInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

function PasswordInput({
  id = "password",
  label,
  placeholder,
  registration,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div>

      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>

      <div className="relative">

        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...registration}
          className={`
            w-full
            rounded-2xl
            border
            bg-white/80
            py-3
            pl-12
            pr-12
            outline-none
            transition-all
            dark:bg-slate-900/70
            dark:text-white
            ${
              error
                ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
                : "border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
            }
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-500
            hover:text-cyan-500
            transition-colors
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message}
        </p>
      )}

    </div>
  );
}

export default PasswordInput;