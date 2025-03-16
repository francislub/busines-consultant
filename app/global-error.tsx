"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 text-white">
          <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-lg mb-6">A critical error has occurred.</p>
          {error.message && (
            <div className="bg-red-900/50 p-4 rounded-md mb-6 max-w-md">
              <p className="font-mono text-sm">{error.message}</p>
              {error.digest && <p className="font-mono text-xs mt-2">Error ID: {error.digest}</p>}
            </div>
          )}
          <button onClick={reset} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md">
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

