export function SkeletonTile({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl animate-pulse ${className}`}
      style={{ background: "var(--surface)", border: "1px solid var(--border)", minHeight: 120 }}
    />
  );
}

export function CourseSkeletons() {
  return (
    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => <SkeletonTile key={i} className="h-36" />)}
    </div>
  );
}