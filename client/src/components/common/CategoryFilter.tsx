interface Props {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  "",
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Salary",
  "Investment",
  "Other",
];

function CategoryFilter({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border p-3"
    >
      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category || "All Categories"}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;