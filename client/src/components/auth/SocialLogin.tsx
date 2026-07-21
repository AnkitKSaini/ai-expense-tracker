import { FaGoogle, FaGithub } from "react-icons/fa";

function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-slate-300
          bg-white
          py-3
          font-medium
          text-slate-700
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-400
          hover:shadow-lg
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-200
        "
      >
        <FaGoogle size={18} />
        Google
      </button>

      <button
        type="button"
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-slate-300
          bg-white
          py-3
          font-medium
          text-slate-700
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-400
          hover:shadow-lg
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-200
        "
      >
        <FaGithub size={18} />
        GitHub
      </button>
    </div>
  );
}

export default SocialLogin;