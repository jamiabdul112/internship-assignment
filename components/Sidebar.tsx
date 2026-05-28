"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, Settings, GraduationCap } from "lucide-react";

const links = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses",   label: "Courses",   icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings",  label: "Settings",  icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        className="hidden md:flex flex-col w-56 h-screen shrink-0 p-3 gap-1"
        style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 py-4 mb-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)" }}
          >
            <GraduationCap size={14} color="white" />
          </div>
          <span className="font-semibold text-sm">LearnFlow</span>
        </div>

        {/* Nav links */}
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left w-full hover:border-b transition-all cursor-pointer"
            style={{ color: active === id ? "var(--text)" : "var(--muted)" }}
          >
            {active === id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-lg"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
              />
            )}
            <Icon size={16} className="relative z-10 shrink-0" />
            <span className="relative z-10">{label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden backdrop-blur-md bg-black/60 fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center py-2 px-4"
        style={{  borderTop: "1px solid var(--border)" }}
      >
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="flex flex-col items-center gap-1 px-3 py-1"
            style={{ color: active === id ? "var(--accent)" : "var(--muted)" }}
          >
            <Icon size={18} />
            <span className="text-[10px]">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}