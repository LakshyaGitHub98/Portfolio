export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-void"
    >
      <div className="w-8 h-8 border border-steel border-t-copper rounded-full animate-spin mb-6" />
      <p className="font-mono text-mono tracking-widest text-fog uppercase">
        Loading
      </p>
    </div>
  );
}
