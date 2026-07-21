import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function PasswordInput({
  id = "password",
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  value,
  onChange,
  required = false,
}: PasswordInputProps) {
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
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
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
            dark:border-slate-700
            dark:bg-slate-900/70
            dark:text-white
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
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
    </div>
  );
}

export default PasswordInput;