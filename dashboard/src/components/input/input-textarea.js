import { Input, Textarea } from "react-daisyui";

export function InputTextarea({
  label,
  name,
  value,
  handleChange,
  type = "text",
  required = false,
  size = "md",
  placeholder = "",
  rows = 3,
}) {
  return (
    <div className="flex flex-col">
      <label className="f-p1-r mb-1 text-neutral-1000">{label}</label>
      <Textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-lg"
        onChange={handleChange}
        size={size}
        value={value}
        type={type}
        name={name}
        required={required}
      />
    </div>
  );
}
