import type { User } from "../../types/auth";

interface Props {
  user: User;
  onEdit: () => void;
}

function ProfileCard({ user, onEdit }: Props) {
  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <div className="flex flex-col items-center">
        <img
          src={
            user.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
          }
          alt="Profile"
          className="mb-4 h-28 w-28 rounded-full"
        />

        <h2 className="text-2xl font-bold">{user.name}</h2>

        <p className="text-gray-500">{user.email}</p>

        <p className="mt-2 text-sm text-gray-500">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onEdit}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Edit Profile
          </button>

          <button className="rounded-lg bg-gray-800 px-5 py-2 text-white">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
