// Next.js PWA manifest — served at /manifest.webmanifest
export default function manifest() {
  return {
    name: "Towfiqul Islam | তৌফিকুল ইসলাম | MERN Stack Developer Portfolio",
    short_name: "Towfiqul Islam",
    description:
      "Portfolio of Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Bangladesh specializing in React, Next.js, Node.js, and MongoDB.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["portfolio", "technology", "developer"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
