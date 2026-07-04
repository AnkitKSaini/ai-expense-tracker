import { useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";

import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({
  onMenuClick,
}: NavbarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="mr-3 text-2xl lg:hidden"
        >
          <HiOutlineMenu />
        </button>

        <h1 className="text-xl font-bold text-blue-600">
          AI Expense Tracker
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded border px-3 py-2"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;