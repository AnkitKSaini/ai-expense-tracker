interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SortSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border p-3"
    >
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
      <option value="amountHigh">Amount: High → Low</option>
      <option value="amountLow">Amount: Low → High</option>
    </select>
  );
}

export default SortSelect;