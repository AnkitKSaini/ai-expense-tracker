interface Props {
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: Props) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">

      <p className="mb-4 text-red-600">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;