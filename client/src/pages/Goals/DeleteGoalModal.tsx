import { TriangleAlert } from "lucide-react";

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteGoalModal({
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <TriangleAlert
            size={30}
            className="text-red-600"
          />
        </div>

        <h2 className="text-center text-2xl font-bold dark:text-white">
          Delete Goal?
        </h2>

        <p className="mt-3 text-center text-gray-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border py-3 font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteGoalModal;