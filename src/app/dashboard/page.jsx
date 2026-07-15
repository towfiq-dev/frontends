"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2, FolderKanban, GraduationCap, Award } from "lucide-react";
import { dashboardApi } from "@/components/lib/dashboardApi";

const CARDS = [
  { resource: "skills", label: "Skills", icon: Code2, href: "/dashboard/skills" },
  { resource: "projects", label: "Projects", icon: FolderKanban, href: "/dashboard/projects" },
  { resource: "education", label: "Education", icon: GraduationCap, href: "/dashboard/education" },
  { resource: "training", label: "Training", icon: Award, href: "/dashboard/training" },
];

export default function DashboardHomePage() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    (async () => {
      const results = await Promise.all(
        CARDS.map((c) => dashboardApi.list(c.resource).catch(() => []))
      );
      const next = {};
      CARDS.forEach((c, i) => (next[c.resource] = results[i].length));
      setCounts(next);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-1">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-8">
        Manage the content shown on your live portfolio.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map(({ resource, label, icon: Icon, href }) => (
          <Link
            key={resource}
            href={href}
            className="bg-[#0c0f0f] border border-white/10 rounded-xl p-5 hover:border-cyan-500/40 transition-colors"
          >
            <Icon size={20} className="text-cyan-400 mb-3" />
            <p className="text-2xl font-bold text-white">
              {counts[resource] ?? "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
