"use client";

import { useState, useCallback, useMemo } from "react";
import { Upload, X, FileIcon, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "./progress";
import { cn } from "@/lib/utils";
import { deleteFromSupabase, uploadToSupabase } from "@/server/storage";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  onUploadComplete?: (url: string) => void;
  value?: File | string | null;
  accept?: string;
  maxSize?: number; // in bytes
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  autoUpload?: boolean;
  bucket?: string;
  filePath: string;
}

export const FileUpload = ({
  onFileChange,
  onUploadComplete,
  value,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  placeholder = "Upload file",
  description = "PNG, JPG, WebP up to 5MB",
  className,
  disabled = false,
  autoUpload = false,
  bucket = "uploads",
  filePath,
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isImage = accept.includes("image");
  const fileValue = value instanceof File ? value : null;
  const urlValue = typeof value === "string" ? value : null;

  const filePathWithExt = useMemo(() => {
    if (fileValue) {
      const fileExt = fileValue.name.split(".").pop();
      return `${filePath}${fileExt ? `.${fileExt}` : ""}`;
    }
    return filePath;
  }, [fileValue, filePath]);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size must be less than ${Math.round(
        maxSize / 1024 / 1024
      )}MB.`;
    }

    if (accept && accept !== "*/*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const isValidType = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          return file.type.startsWith(type.slice(0, -2));
        }
        return file.type === type;
      });

      if (!isValidType) {
        return `File type not supported. Accepted: ${accept}`;
      }
    }

    return null;
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      console.log("Selected file:", file);
      setError(null);

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      onFileChange(file);

      if (autoUpload) {
        try {
          setUploading(true);
          setUploadProgress(0);
          console.log("Uploading file to Supabase...", file, filePath, bucket);

          const result = await uploadToSupabase(file, filePathWithExt, bucket);

          if (result.success && result.url) {
            setUploadProgress(100);
            onUploadComplete?.(result.url);
          } else {
            throw new Error("Upload failed");
          }
        } catch (error) {
          setError("Upload failed. Please try again.");
          console.error("Upload error:", error);
        } finally {
          setUploading(false);
          setUploadProgress(0);
        }
      }
    },
    [onFileChange, onUploadComplete, autoUpload, maxSize, accept]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);

      if (disabled || uploading) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect, disabled, uploading]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled && !uploading) {
        setDragActive(true);
      }
    },
    [disabled, uploading]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = async () => {
    await deleteFromSupabase(bucket, filePathWithExt);
    onFileChange(null);
    setError(null);
    setUploadProgress(0);
  };

  const renderFilePreview = () => {
    if (urlValue) {
      return (
        <div className="relative group">
          {isImage ? (
            <img
              src={urlValue}
              alt="Uploaded file"
              className="w-20 h-20 object-cover rounded-lg"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <FileIcon className="w-8 h-8 text-gray-500" />
            </div>
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      );
    }

    if (fileValue) {
      return (
        <div className="relative group">
          {isImage && fileValue.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(fileValue)}
              alt="Selected file"
              className="w-20 h-20 object-cover rounded-lg"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <FileIcon className="w-8 h-8 text-gray-500" />
            </div>
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 group",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5",
          disabled && "opacity-50 cursor-not-allowed",
          uploading && "cursor-wait"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
          id="file-upload"
          disabled={disabled || uploading}
        />

        {fileValue || urlValue ? (
          <div className="flex flex-col items-center space-y-4">
            {renderFilePreview()}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            </div>
            {!autoUpload && fileValue && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleFileSelect(fileValue)}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            )}
          </div>
        ) : (
          <label htmlFor="file-upload" className="cursor-pointer block">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full group-hover:bg-primary/10 transition-colors">
                {isImage ? (
                  <ImageIcon className="w-8 h-8 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors" />
                )}
              </div>
              <div>
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  {placeholder}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {description}
                </p>
              </div>
            </div>
          </label>
        )}
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
