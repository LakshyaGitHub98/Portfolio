"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-void">
      <p className="font-mono text-mono tracking-widest text-copper uppercase mb-4">
        System error
      </p>
      <h1 className="font-display text-h2 font-semibold text-bone mb-4">
        Something went wrong
      </h1>
      <p className="font-body text-fog text-base leading-relaxed max-w-md text-center mb-8">
        {error.digest
          ? `Error: ${error.digest}`
          : "An unexpected error occurred. The system encountered a fault while rendering this page."}
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded transition-colors duration-200 bg-copper text-void hover:bg-copper/80"
      >
        Retry
      </button>
    </div>
  );
}
