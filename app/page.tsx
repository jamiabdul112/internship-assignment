import { Suspense } from "react";
import { getCourses } from "@/lib/getCourses";
import Sidebar from "@/components/Sidebar";
import HeroTile from "@/components/HeroTile";
import ActivityTile from "@/components/ActivityTile";
import CourseGrid from "@/components/CourseGrid";
import { CourseSkeletons } from "@/components/Skeleton";

async function Courses() {
  const courses = await getCourses();
  return <CourseGrid courses={courses} />;
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <Sidebar />

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 overflow-y-auto content-start pt-4 pb-20 md:pb-6">
        <HeroTile />

        <Suspense fallback={<CourseSkeletons />}>
          <Courses />
        </Suspense>

        <ActivityTile />
      </main>
    </div>
  );
}