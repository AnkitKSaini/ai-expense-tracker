import { useState } from "react";

interface Props {
  onSave: (currentPassword: string, newPassword: string) => Promise<void>;
}

function ChangePasswordModal({ onSave }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Change Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="mb-3 w-full rounded border p-3"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="mb-4 w-full rounded border p-3"
      />

      <button
        onClick={() => onSave(currentPassword, newPassword)}
        className="rounded bg-blue-600 px-5 py-2 text-white"
      >
        Change Password
      </button>
    </div>
  );
}

export default ChangePasswordModal;
