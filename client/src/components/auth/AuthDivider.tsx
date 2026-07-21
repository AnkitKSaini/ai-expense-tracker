function AuthDivider() {
  return (
    <div className="relative my-8">

      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200 dark:border-slate-700" />
      </div>

      <div className="relative flex justify-center">
        <span
          className="
            rounded-full
            border
            border-slate-200
            bg-white
            px-4
            py-1
            text-sm
            font-medium
            text-slate-500
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-400
          "
        >
          OR
        </span>
      </div>

    </div>
  );
}

export default AuthDivider;