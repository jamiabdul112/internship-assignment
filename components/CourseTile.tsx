"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { Course } from "@/lib/types";

function ProgressBar({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 80, damping: 20 });
  const width = useTransform(spring, (v) => `${v}%`);

  useEffect(() => {
    if (inView) raw.set(value);
  }, [inView, value, raw]);

  return (
    <div ref={ref} className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{
          width,
          background: "linear-gradient(90deg, var(--accent), #818cf8)",
          boxShadow: "0 0 8px var(--accent-glow)",
        }}
      />
    </div>
  );
}

export default function CourseTile({ course }: { course: Course }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[course.icon_name] ?? Icons.BookOpen;

  return (
    <motion.article
      className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden cursor-pointer"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 24px var(--accent-glow)",
        borderColor: "rgba(99,102,241,0.4)",
      }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
    >
      {/* gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(99,102,241,0.08) 0%, transparent 60%)",
        }}
      />

      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center relative"
        style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
      >
        <Icon size={16} style={{ color: "var(--accent)" }} />
      </div>

      <div className="flex flex-col gap-2 relative">
        <p className="text-sm font-medium">{course.title}</p>
        <ProgressBar value={course.progress} />
        <div className="flex justify-between">
          <span className="text-xs" style={{ color: "var(--muted)" }}>Progress</span>
          <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>{course.progress}%</span>
        </div>
      </div>
    </motion.article>
  );
}