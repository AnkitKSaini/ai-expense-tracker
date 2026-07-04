interface Props {
  title: string;
}

function EmptyState({ title }: Props) {
  return (
    <div className="rounded-lg border border-dashed p-10 text-center text-gray-500">
      {title}
    </div>
  );
}

export default EmptyState;