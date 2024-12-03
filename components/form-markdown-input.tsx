import React from "react";
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";

interface FormMarkDownInputProps extends MDEditorProps {
    label: string;
    name: string;
    placeholder?: string;
    error?: string | null | undefined;
}

const FormMarkDownInput = ({
    label,
    name,
    placeholder,
    error,
    ...props
}: FormMarkDownInputProps) => {
    return (
        <div data-color-mode="light">
            <label htmlFor={name} className="startup-form-label">
                {label}
            </label>
            <MDEditor
                id={name}
                className="startup-form-editor"
                preview="edit"
                height={300}
                style={{ borderRadius: 20, overflow: "hidden" }}
                textareaProps={{
                    placeholder
                }}
                previewOptions={{
                    disallowedElements: ["style"]
                }}
                {...props}
            />

            {error && <p className="startup-form-error">{error}</p>}
        </div>
    );
};

export default FormMarkDownInput;
