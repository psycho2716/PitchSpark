"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormImageInputProps {
  name: string;
  label: string;
  onChange?: (file?: File) => void;
  setError?: (error: string | undefined) => void;
  value?: string;
  className?: string;
  error?: string | null;
  required?: boolean;
}

export function FormImageInput({
  name,
  label,
  onChange,
  value,
  className,
  error,
  setError,
}: FormImageInputProps) {
  const [preview, setPreview] = useState<string | undefined | null>(value);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError?.(undefined);
      setIsUploading(false);

      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];

      if (file.size > 5 * 1024 * 1024) {
        setError?.("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onChange?.(file); // Ensure the file is passed up
    },
    [onChange, setError],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    onFileDialogOpen: () => setIsUploading(true),
    onFileDialogCancel: () => setIsUploading(false),
  });

  const removeImage = useCallback(() => {
    setPreview(undefined);
    onChange?.(undefined);
  }, [onChange]);

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <label htmlFor={name} className="startup-form-label">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 dark:border-gray-800",
          "transition-colors duration-200 ease-in-out cursor-pointer",
          "min-h-[160px] flex items-center justify-center",
          isDragActive && "border-primary bg-primary/5",
          isUploading && "border-primary bg-primary/10",
          preview && "border-solid bg-muted/50",
          error && "border-destructive",
        )}
      >
        <input {...getInputProps()} />
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              width={200}
              height={140}
              className="h-full w-full object-cover rounded-md"
            />
            <Button
              size="icon"
              variant="default"
              className="absolute -top-2 -right-2 h-6 w-6 text-white"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="text-center space-y-2">
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="h-8 w-8 text-muted-foreground" />
              <div className="text-16-medium">
                {isDragActive ? (
                  <span className="text-primary">Drop your image here</span>
                ) : (
                  <span className="text-muted-foreground">
                    Drag & drop or click to upload
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              PNG, JPG, GIF up to 5MB
            </div>
          </div>
        )}
      </div>
      {error && <p className="startup-form-error">{error}</p>}
    </div>
  );
}
