import { useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";

import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="mr-3 rounded-lg p-2 text-2xl transition hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        >
          <HiOutlineMenu />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            AI Expense Tracker
          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Smart Finance Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <span className="text-lg">{theme === "dark" ? "☀️" : "🌙"}</span>
        </button>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
