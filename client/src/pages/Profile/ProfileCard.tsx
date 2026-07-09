import type { User } from "../../types/auth";
import {
  Mail,
  CalendarDays,
  UserRound,
  Pencil,
  KeyRound,
} from "lucide-react";

interface Props {
  user: User;
  onEdit: () => void;
}

function ProfileCard({ user, onEdit }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="h-36 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600"></div>

      {/* Profile */}
      <div className="-mt-16 flex flex-col items-center px-8 pb-8">
        <img
          src={
            user.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name,
            )}&background=2563eb&color=fff&size=256`
          }
          alt="Profile"
          className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl dark:border-gray-900"
        />

        <h2 className="mt-5 flex items-center gap-2 text-3xl font-bold text-gray-900 dark:text-white">
          <UserRound size={26} />
          {user.name}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Mail size={18} />
          {user.email}
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CalendarDays size={16} />
          Member Since{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit Profile
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <KeyRound size={18} />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;