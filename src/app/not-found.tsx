import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-void">
      <p className="font-mono text-mono tracking-widest text-copper uppercase mb-4">
        404
      </p>
      <h1 className="font-display text-h2 font-semibold text-bone mb-4">
        Page not found
      </h1>
      <p className="font-body text-fog text-base leading-relaxed max-w-md text-center mb-8">
        The system couldn&apos;t locate that route. It may have been moved or
        never existed.
      </p>
      <Link
        href="/Portfolio/"
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded transition-colors duration-200 bg-copper text-void hover:bg-copper/80"
      >
        Return home
      </Link>
    </div>
  );
}
