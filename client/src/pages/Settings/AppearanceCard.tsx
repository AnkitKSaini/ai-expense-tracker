import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function AppearanceCard() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        🎨 Appearance
      </h2>

      <div className="space-y-4">
        {/* Theme Status */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon className="text-yellow-500" size={22} />
            ) : (
              <Sun className="text-orange-500" size={22} />
            )}

            <div>
              <p className="font-semibold dark:text-white">
                Theme
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current:{" "}
                <span className="font-medium capitalize">
                  {theme}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Switch Theme
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-dashed border-gray-300 p-5 dark:border-gray-600">
          <div className="mb-3 flex items-center gap-2">
            <Monitor size={20} />
            <span className="font-semibold dark:text-white">
              Preview
            </span>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-100 p-5 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-bold dark:text-white">
              AI Expense Tracker
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This is how your application looks with the
              selected theme.
            </p>

            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
              Sample Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppearanceCard;