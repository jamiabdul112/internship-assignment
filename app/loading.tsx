import { SkeletonTile, CourseSkeletons } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen" style={{ background: "var(--bg)" }}>
      <div className="hidden md:block w-56 shrink-0 animate-pulse" style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }} />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 content-start">
        <SkeletonTile className="col-span-1 md:col-span-2 h-36" />
        <CourseSkeletons />
        <SkeletonTile className="col-span-1 md:col-span-2 h-40" />
      </div>
    </div>
  );
}