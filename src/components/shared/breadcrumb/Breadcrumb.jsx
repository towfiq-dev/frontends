import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Visible breadcrumb trail. Mirrors the BreadcrumbList JSON-LD already
 * present on each subpage, so the structured data now has a real visible
 * equivalent on the page (not just schema-only).
 *
 * Usage:
 *   <Breadcrumb items={[{ name: "Projects" }]} />
 * "Home" is always added automatically as the first crumb. The last item
 * is rendered as plain text (current page), earlier items as links.
 */
export default function Breadcrumb({ items = [], bare = false, className = "" }) {
  const trail = [{ name: "Home", href: "/" }, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${bare ? "w-full" : "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5"} ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight size={12} aria-hidden="true" className="text-gray-700 flex-shrink-0" />
              )}
              {isLast || !item.href ? (
                <span className="text-gray-400 font-medium" aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-sky-400 transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
