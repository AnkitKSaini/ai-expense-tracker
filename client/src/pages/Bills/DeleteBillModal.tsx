interface Props {
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteBillModal({
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-900">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">

          <span className="text-3xl">
            🗑️
          </span>

        </div>

        <h2 className="mt-6 text-center text-2xl font-bold dark:text-white">
          Delete Bill?
        </h2>

        <p className="mt-3 text-center text-gray-500 dark:text-gray-400">
          This bill will be permanently removed.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Delete Bill
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteBillModal;