import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      id = "password",
      label = "Password",
      placeholder = "Enter your password",
      error,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

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
            ref={ref}
            id={id}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className={`
              w-full
              rounded-2xl
              border
              ${
                error
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              }
              bg-white/80
              py-3
              pl-12
              pr-12
              text-slate-900
              outline-none
              transition-all
              duration-300
              placeholder:text-slate-400
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-500/20
              dark:bg-slate-900/70
              dark:text-white
              ${className}
            `}
            {...props}
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
              transition-colors
              hover:text-cyan-500
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
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;