import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing"; // Ensure this file exists and has the correct exports
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface ImageUploadProps {
  onChange: (url?: string) => void;
  value: string;
  disabled?: boolean;
}

export const ImageUpload = ({
  onChange,
  value,
  disabled,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <div className="relative h-40 w-40 overflow-hidden rounded-md">
        {value ? (
          <Image
            fill
            className="object-cover"
            alt="Upload"
            src={value || "/placeholder.svg"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No image</p>
            )}
          </div>
        )}
      </div>
      {!disabled && (
        <div className="flex justify-center">
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              onChange(res?.[0]?.url); // Use the URL from the response
              setIsUploading(false);
            }}
            onUploadError={(error: Error) => {
              console.error(error);
              setIsUploading(false);
            }}
            onUploadBegin={() => {
              setIsUploading(true);
            }}
          />
        </div>
      )}
    </div>
  );
};
