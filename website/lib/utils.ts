import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import {databases, ID} from '@/lib/appwrite'
// import { appwriteconfig } from "./config"
// import { Query } from "appwrite"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
      