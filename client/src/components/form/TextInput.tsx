import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "number";
  placeholder?: string;
  icon?: React.ReactNode;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

function TextInput({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  registration,
  error,
}: TextInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...registration}
          className={`
            w-full
            rounded-2xl
            border
            bg-white/80
            py-3
            ${icon ? "pl-12" : "pl-4"}
            pr-4
            outline-none
            transition-all
            focus:ring-4
            dark:bg-slate-900/70
            dark:text-white
            ${
              error
                ? "border-red-500 focus:ring-red-500/20"
                : "border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20"
            }
          `}
        />

      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message}
        </p>
      )}

    </div>
  );
}

export default TextInput;