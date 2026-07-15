import SkillsClient from "@/components/skillsClient/SkillsClient";
import React from 'react';
import { getSkillColumns } from "@/components/lib/getPortfolioData";

import { SITE_URL as BASE } from "@/components/lib/constants";

export const metadata = {
  title: "Skills & Technologies | Towfiqul Islam | তৌফিকুল ইসলাম",
  description:
    "Towfiqul Islam's (তৌফিকুল ইসলাম) technical skill set: React, Next.js, JavaScript, Node.js, MongoDB, Tailwind CSS, Redux, Docker, BetterAuth, and more.",
  keywords: [
    "Towfiqul Islam skills",
    "তৌফিকুল ইসলাম দক্ষতা",
    "Towfiqul Islam",
    "MERN Stack Developer",
    "React Developer Bangladesh",
    "Next.js Developer",
    "Node.js",
    "MongoDB",
    "JavaScript",
    "Tailwind CSS",
    "Full Stack Developer Bangladesh",
    "Web Developer Portfolio",
  ],
  alternates: { canonical: "/navLinks/skills" },
  openGraph: {
    title: "Skills & Technologies | Towfiqul Islam | তৌফিকুল ইসলাম",
    description:
      "Full stack technical skills of Towfiqul Islam (তৌফিকুল ইসলাম) — React, Next.js, Node.js, MongoDB, and modern DevOps tools.",
    url: `${BASE}/navLinks/skills`,
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Skills — Towfiqul Islam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Technologies | Towfiqul Islam | তৌফিকুল ইসলাম",
    description:
      "Full stack technical skills of Towfiqul Islam — React, Next.js, Node.js, MongoDB, and modern DevOps tools.",
    images: [`${BASE}/og-image.png`],
  },
};

const skillsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Skills", item: `${BASE}/navLinks/skills` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Technical Skills of Towfiqul Islam (তৌফিকুল ইসলাম)",
      description:
        "Programming languages, frameworks, and tools used by Towfiqul Islam — Full Stack MERN Developer from Bangladesh.",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "React — 95%" },
        { "@type": "ListItem", position: 2, name: "Next.js — 90%" },
        { "@type": "ListItem", position: 3, name: "JavaScript — 95%" },
        { "@type": "ListItem", position: 4, name: "Node.js — 90%" },
        { "@type": "ListItem", position: 5, name: "MongoDB — 85%" },
        { "@type": "ListItem", position: 6, name: "Tailwind CSS — 98%" },
        { "@type": "ListItem", position: 7, name: "Redux — 80%" },
        { "@type": "ListItem", position: 8, name: "Docker — 78%" },
        { "@type": "ListItem", position: 9, name: "Firebase — 80%" },
        { "@type": "ListItem", position: 10, name: "Git — 92%" },
      ],
    },
  ],
};

const SkillsPage = async () => {
  const columns = await getSkillColumns();
  return (
    <div>
      <SkillsClient skillsJsonLd={skillsJsonLd} columns={columns} />
    </div>
  );
};

export default SkillsPage;
