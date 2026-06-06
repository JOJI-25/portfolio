'use client';
import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { 
    console.error("GLOBAL ERROR CAUGHT:", error); 
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-red-500 p-8 font-mono">
      <h2 className="text-3xl mb-4 font-bold">FATAL REACT CRASH!</h2>
      <p className="mb-4">Please screenshot this entire page and send it to the AI:</p>
      <div className="bg-red-950/50 p-6 rounded border border-red-500 text-left overflow-auto max-w-4xl w-full">
        <p className="font-bold text-lg mb-2">Error Message:</p>
        <p className="mb-4 text-white break-words">{error.message || "Unknown error"}</p>
        <p className="font-bold text-lg mb-2">Stack Trace:</p>
        <pre className="text-xs whitespace-pre-wrap text-gray-300">{error.stack}</pre>
        {error.digest && <p className="mt-4 text-xs opacity-50">Digest: {error.digest}</p>}
      </div>
      <button 
        onClick={() => reset()} 
        className="mt-8 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-sans font-bold"
      >
        Try Again
      </button>
    </div>
  );
}
