import {
  KeyRound,
  LogOut,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SecurityCard() {
  const navigate = useNavigate();

  const logout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        🔒 Security
      </h2>

      <div className="space-y-6">
        {/* Security Status */}
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <div className="flex items-center gap-3">
            <ShieldCheck
              className="text-green-600"
              size={26}
            />

            <div>
              <h3 className="font-semibold dark:text-white">
                Account Security
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your account is secure.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
            Active
          </span>
        </div>

        {/* Active Session */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Smartphone
              className="text-blue-600"
              size={22}
            />

            <div>
              <h3 className="font-semibold dark:text-white">
                Active Session
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                1 Device Logged In
              </p>
            </div>
          </div>

          <span className="text-sm font-semibold text-green-600">
            Online
          </span>
        </div>

        {/* Buttons */}
        <div className="grid gap-4 md:grid-cols-2">
          <button
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <KeyRound size={18} />
            Change Password
          </button>

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl border border-red-300 bg-red-50 p-5 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-center gap-3">
            <Trash2
              className="text-red-600"
              size={22}
            />

            <div>
              <h3 className="font-semibold text-red-600">
                Danger Zone
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Permanently delete your account.
              </p>
            </div>
          </div>

          <button
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-xl border border-red-500 py-3 font-semibold text-red-600 opacity-60"
          >
            Delete Account (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecurityCard;