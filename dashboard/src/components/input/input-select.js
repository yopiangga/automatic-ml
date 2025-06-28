import { Select } from "react-daisyui";

export function InputSelect({
  label,
  name,
  value,
  handleChange,
  required = false,
  size = "md",
  placeholder = "",
  options = [],
  readonly = false,
}) {
  return (
    <div className="flex flex-col">
      <label className="f-p1-r mb-1 text-neutral-1000">{label}</label>

      <Select
        value={value}
        onChange={handleChange}
        name={name}
        required={required}
        size={size}
        className="rounded-lg"
        disabled={readonly}
      >
        <Select.Option value={"default"} disabled>
          {placeholder}
        </Select.Option>
        {options.map((item, index) => {
          return (
            <Select.Option key={index} value={item.value}>
              {item.label}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
}
