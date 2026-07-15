// IMPORTANT Tailwind CSS note:
// Tailwind only generates CSS for class names it can find as literal text
// in your source files at build time. Since Education/Training color
// classes are now stored in MongoDB (chosen at runtime, from the
// Dashboard), a class typed freely into the database would NOT have any
// matching CSS generated for it and would silently do nothing.
//
// These presets exist as literal strings in this file specifically so
// Tailwind's scanner picks them up during the build. The Dashboard's
// "Quick theme" buttons in the Education/Training forms fill the
// gradient/border/glow/badge fields in with one of these safe combos.
// If you type a fully custom class instead of using a preset, it may not
// render until you also add that exact class string somewhere in the
// source (e.g. add a new preset here) and rebuild/redeploy.

export const EDUCATION_THEMES = [
  {
    key: "blue",
    label: "Blue",
    gradient: "from-blue-500 to-cyan-400",
    glowColor: "shadow-blue-500/20",
    borderColor: "border-blue-500/30",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    key: "purple",
    label: "Purple",
    gradient: "from-purple-500 to-pink-500",
    glowColor: "shadow-purple-500/20",
    borderColor: "border-purple-500/30",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    key: "emerald",
    label: "Emerald",
    gradient: "from-emerald-500 to-teal-400",
    glowColor: "shadow-emerald-500/20",
    borderColor: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    key: "amber",
    label: "Amber",
    gradient: "from-amber-500 to-orange-400",
    glowColor: "shadow-amber-500/20",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    key: "rose",
    label: "Rose",
    gradient: "from-rose-500 to-red-400",
    glowColor: "shadow-rose-500/20",
    borderColor: "border-rose-500/30",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
  {
    key: "indigo",
    label: "Indigo",
    gradient: "from-indigo-500 to-violet-400",
    glowColor: "shadow-indigo-500/20",
    borderColor: "border-indigo-500/30",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
];

export const COURSE_THEMES = [
  { key: "purple", label: "Purple", color: "#a855f7", gradient: "from-purple-600 to-fuchsia-500" },
  { key: "emerald", label: "Emerald", color: "#10b981", gradient: "from-emerald-500 to-teal-500" },
  { key: "blue", label: "Blue", color: "#3b82f6", gradient: "from-blue-500 to-cyan-400" },
  { key: "amber", label: "Amber", color: "#f59e0b", gradient: "from-amber-500 to-orange-400" },
  { key: "rose", label: "Rose", color: "#f43f5e", gradient: "from-rose-500 to-red-400" },
];
