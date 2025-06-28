export function InputCheckbox({
  label,
  name,
  value,
  handleChange,
  required = false,
  size = "md",
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-full rounded-lg"
        onChange={handleChange}
        size={size}
        checked={value}
        name={name}
        required={required}
        id={name}
      />
      <label className="f-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
