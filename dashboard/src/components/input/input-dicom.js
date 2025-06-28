import { FileInput } from "react-daisyui";

export function InputDicom({
  label,
  name,
  value,
  preview,
  handleChange,
  required = false,
  size = "md",
}) {
  return (
    <div className="flex flex-col">
      <label className="f-p1-r mb-1 text-neutral-1000">{label}</label>
      <FileInput
        size={size}
        name={name}
        required={required}
        onChange={handleChange}
      />
      {/* <div className="rounded-md mt-4">
        <img src={preview} />
      </div> */}
    </div>
  );
}
