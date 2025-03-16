"use client";
 
import { generateComponents } from "@uploadthing/react";
 
import type { OurFileRouter } from "@/lib/uploadthing";
 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
