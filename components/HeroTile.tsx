"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function HeroTile() {
  return (
    <motion.article
      className="col-span-1 min-h-[146px] md:col-span-2 rounded-2xl p-6 relative overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      whileHover={{ scale: 1.01, borderColor: "rgba(99,102,241,0.4)" }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
    >
      {/* subtle glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
      />

      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>
        Good morning
      </p>
      <h1 className="text-2xl font-bold mb-3">Welcome back, Alex 👋</h1>
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
        style={{
          background: "rgba(251,146,60,0.1)",
          border: "1px solid rgba(251,146,60,0.25)",
          color: "#fb923c",
        }}
      >
        <Flame size={13} />
        12 day streak — keep it up!
      </div>
    </motion.article>
  );
}