import AppearanceCard from "./AppearanceCard";
import PreferenceCard from "./PreferenceCard";
import SecurityCard from "./SecurityCard";

function Settings() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="text-3xl font-bold dark:text-white">
        ⚙️ Settings
      </h1>

      <AppearanceCard />

      <PreferenceCard />

      <SecurityCard />
    </div>
  );
}

export default Settings;