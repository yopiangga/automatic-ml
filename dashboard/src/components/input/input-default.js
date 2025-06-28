import { Input } from "react-daisyui";

export function InputDefault({
  label,
  name,
  value,
  handleChange,
  type = "text",
  required = false,
  size = "md",
  placeholder = "",
  readonly = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="f-p1-r mb-1 text-neutral-1000">{label}</label>
      <Input
        placeholder={placeholder}
        className="w-full rounded-lg"
        onChange={handleChange}
        size={size}
        value={value}
        type={type}
        name={name}
        required={required}
        disabled={readonly}
      />
    </div>
  );
}
