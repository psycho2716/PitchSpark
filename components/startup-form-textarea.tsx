import React from "react";
import { Textarea } from "./ui/textarea";

interface FormStartupTextareaProps {
    label: string;
    name: string;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    error?: string | null | undefined;
}

const FormStartupTextarea = ({
    label,
    name,
    placeholder,
    defaultValue,
    required = false,
    error
}: FormStartupTextareaProps) => {
    return (
        <div>
            <label htmlFor={name} className="startup-form-label">
                {label}
            </label>
            <Textarea
                id={name}
                name={name}
                className="startup-form-textarea"
                placeholder={placeholder}
                required={required}
                defaultValue={defaultValue}
            />

            {error && <p className="startup-form-error">{error}</p>}
        </div>
    );
};

export default FormStartupTextarea;
