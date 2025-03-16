"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 text-white">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg mb-6">We apologize for the inconvenience.</p>
      {error.message && (
        <div className="bg-red-900/50 p-4 rounded-md mb-6 max-w-md">
          <p className="font-mono text-sm">{error.message}</p>
          {error.digest && <p className="font-mono text-xs mt-2">Error ID: {error.digest}</p>}
        </div>
      )}
      <div className="flex gap-4">
        <Button onClick={reset} className="bg-red-600 hover:bg-red-700">
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline">Go to Home</Button>
        </Link>
      </div>
    </div>
  )
}

