import { useState } from "react";
import {
  Bell,
  Brain,
  Globe,
  BadgeIndianRupee,
} from "lucide-react";

function PreferenceCard() {
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        ⚙ Preferences
      </h2>

      <div className="space-y-6">
        {/* Currency */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BadgeIndianRupee className="text-green-600" />

            <div>
              <h3 className="font-semibold dark:text-white">
                Currency
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select your preferred currency.
              </p>
            </div>
          </div>

          <select
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value)
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="text-blue-600" />

            <div>
              <h3 className="font-semibold dark:text-white">
                Language
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred language.
              </p>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="text-yellow-500" />

            <div>
              <h3 className="font-semibold dark:text-white">
                Notifications
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable budget & reminder notifications.
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(!notifications)
            }
            className="h-5 w-5"
          />
        </div>

        {/* AI Suggestions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="text-purple-600" />

            <div>
              <h3 className="font-semibold dark:text-white">
                AI Suggestions
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable personalized AI recommendations.
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={aiSuggestions}
            onChange={() =>
              setAiSuggestions(!aiSuggestions)
            }
            className="h-5 w-5"
          />
        </div>
      </div>
    </div>
  );
}

export default PreferenceCard;