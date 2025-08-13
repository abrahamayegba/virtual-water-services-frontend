import React, { useCallback } from "react";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string;
  maxSize?: number; // in MB
  currentFile?: File | string;
  onRemove?: () => void;
  label: string;
}

export default function FileUpload({
  onFileSelect,
  acceptedTypes,
  maxSize = 10,
  currentFile,
  onRemove,
  label,
}: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const file = files[0];
        if (file.size <= maxSize * 1024 * 1024) {
          onFileSelect(file);
        } else {
          alert(`File size must be less than ${maxSize}MB`);
        }
      }
    },
    [onFileSelect, maxSize]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size <= maxSize * 1024 * 1024) {
        onFileSelect(file);
      } else {
        alert(`File size must be less than ${maxSize}MB`);
      }
    }
  };

  const getFileName = () => {
    if (currentFile instanceof File) {
      return currentFile.name;
    }
    if (typeof currentFile === "string") {
      return currentFile.split("/").pop() || "Current file";
    }
    return null;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {currentFile ? (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <File className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-800">{getFileName()}</span>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              className="p-1 text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
        >
          <input
            type="file"
            accept={acceptedTypes}
            onChange={handleFileInput}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
          />
          <label
            htmlFor={`file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
            className="cursor-pointer"
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drop your file here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Accepted formats: {acceptedTypes.replace(/\./g, "").toUpperCase()}
            </p>
            <p className="text-xs text-gray-500">Maximum size: {maxSize}MB</p>
          </label>
        </div>
      )}
    </div>
  );
}
