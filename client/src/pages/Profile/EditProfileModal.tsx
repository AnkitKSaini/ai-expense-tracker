import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { User } from "../../types/auth";

type ProfileFormData = {
  name: string;
  avatar?: FileList;
};

interface Props {
  open: boolean;
  user: User;
  onClose: () => void;
  onSave: (data: ProfileFormData) => Promise<void>;
}


function EditProfileModal({ open, user, onClose, onSave }: Props) {
const { register, handleSubmit, reset } = useForm<ProfileFormData>({
      defaultValues: {
      name: user.name,
      avatar: undefined,
    },
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    reset({
      name: user.name,
      avatar: undefined,
    });
  }, [user, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setLoading(true);

            await onSave(data);

            onClose();
          } finally {
            setLoading(false);
          }
        })}
        className="w-full max-w-md rounded-xl bg-white p-6"
      >
        <h2 className="mb-5 text-xl font-bold">Edit Profile</h2>

        <input
          {...register("name")}
          placeholder="Full Name"
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="file"
          accept="image/*"
          {...register("avatar")}
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 h-24 w-24 rounded-full object-cover"
          />
        )}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileModal;
