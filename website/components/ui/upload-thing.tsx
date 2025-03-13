"use client"

import { UploadDropzone } from "@uploadthing/react"
import { useState } from "react"
import { toast } from "sonner"
// import { OurFileRouter } from "@/app/api/uploadthing/core"

export function UploadImage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            setFileUrl(res[0].url)
            toast.success("Upload successful!")
          }
        }}
        onUploadError={(error) => {
          toast.error(`Upload failed: ${error.message}`)
        }}
      />

      {fileUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Uploaded Image:</p>
          <img src={fileUrl} alt="Uploaded" className="rounded-md w-full max-w-xs" />
        </div>
      )}
    </div>
  )
}
