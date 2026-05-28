"use client";

import { motion } from "framer-motion";

const SEED = [
  2,0,1,3,1,2,0,1,2,3,1,0,
  1,2,3,0,2,1,3,2,0,1,2,1,
  3,1,0,2,1,3,2,1,0,3,1,2,
  0,2,1,3,0,1,2,3,1,0,2,1,
  2,3,1,0,2,1,3,1,2,0,1,3,
  1,2,0,3,1,2,1,0,3,2,1,2,
  0,1,3,2,1,0,2,3,1,2,0,1,
];

const colors = [
  "var(--border)",
  "rgba(99,102,241,0.3)",
  "rgba(99,102,241,0.6)",
  "rgba(99,102,241,0.9)",
];

export default function ActivityTile() {
  return (
    <motion.article
      className="col-span-1 md:col-span-2 rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      whileHover={{ scale: 1.01, borderColor: "rgba(99,102,241,0.3)" }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-center">
        <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--muted)" }}>
          Activity
        </p>
        <span className="text-xs" style={{ color: "var(--muted)" }}>Last 12 weeks</span>
      </div>

      {/* Added suppressHydrationWarning to handle static grid layout mismatches smoothly */}
      <div 
        className="grid gap-1" 
        style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        suppressHydrationWarning
      >
        {SEED.map((level, i) => (
          <div
            key={i}
            /* Kept classes strictly on a single line to remove hidden spacing mismatches */
            className="aspect-square rounded-sm transform transition-transform duration-300 ease-in-out hover:scale-130 cursor-pointer"
            style={{ background: colors[level] }}
          />
        ))}
      </div>

      <p className="text-xs" style={{ color: "var(--muted)" }}>84 contributions in the last 12 weeks</p>
    </motion.article>
  );
}