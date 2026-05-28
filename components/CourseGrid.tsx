"use client";

import { motion } from "framer-motion";
import CourseTile from "./CourseTile";
import type { Course } from "@/lib/types";

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <section className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course, i) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 260, damping: 22, delay: i * 0.08 }}
        >
          <CourseTile course={course} />
        </motion.div>
      ))}
    </section>
  );
}