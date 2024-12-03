import React from "react";
import { Input } from "./ui/input";

interface FormStartupInputProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  error?: string | null | undefined;
}

const FormStartupInput = ({
  label,
  name,
  placeholder,
  defaultValue,
  required = false,
  error,
}: FormStartupInputProps) => {
  return (
    <div>
      <label htmlFor={name} className="startup-form-label">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        className="startup-form-input"
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
      />

      {error && <p className="startup-form-error">{error}</p>}
    </div>
  );
};

export default FormStartupInput;
