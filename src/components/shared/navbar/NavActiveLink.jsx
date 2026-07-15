"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Nav link that highlights itself when its href matches the current route.
// Renders a taller mobile-drawer style or a compact desktop pill style.
export default function NavActiveLink({ href, icon, name, mobile = false }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (mobile) {
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
          isActive
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`}
      >
        {icon}
        {name}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
        isActive
          ? "bg-white/10 text-white shadow-inner"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      {name}
    </Link>
  );
}
