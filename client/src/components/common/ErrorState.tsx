interface Props {
  message?: string;
}

function ErrorState({
  message = "Something went wrong.",
}: Props) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-600">
        {message}
      </h2>
    </div>
  );
}

export default ErrorState;