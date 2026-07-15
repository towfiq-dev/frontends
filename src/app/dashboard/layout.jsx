"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Code2,
  FolderKanban,
  GraduationCap,
  Award,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "@/components/lib/authClient";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard Home", icon: LayoutDashboard },
  { href: "/dashboard/skills", label: "Skills", icon: Code2 },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/education", label: "Education", icon: GraduationCap },
  { href: "/dashboard/training", label: "Training", icon: Award },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // This is the actual auth gate for the dashboard UI (see middleware.js
  // for why it can't live at the edge): if there's no valid session,
  // bounce to login. The backend's requireAuth middleware is what
  // actually protects the data (Create/Update/Delete), independent of
  // this — so even if this check were somehow bypassed, writes still
  // can't happen without a real session.
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/dashboard/login");
    }
  }, [isPending, session, router]);

  if (pathname === "/dashboard/login") {
    return children;
  }

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-[#08090a] flex items-center justify-center text-gray-500 text-sm">
        Checking session...
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/dashboard/login");
  };

  return (
    <div className="min-h-screen bg-[#08090a] flex">
      <aside className="w-60 shrink-0 border-r border-white/10 bg-[#0c0f0f] p-4 flex flex-col">
        <p className="text-sm font-bold text-white px-2 mb-6">Portfolio Dashboard</p>
        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-cyan-500/10 text-cyan-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-red-400"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
