import Breadcrumb from "@/components/shared/breadcrumb/Breadcrumb";
import { getAllProjects } from "@/components/lib/getPortfolioData";

import { SITE_URL as BASE } from "@/components/lib/constants";

export async function generateMetadata() {
  const allProjects = await getAllProjects();
  const projectCount = allProjects.length;
  return {
  title: "Projects | Towfiqul Islam | তৌফিকুল ইসলাম",
  description:
    `Browse ${projectCount}+ projects by Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Bangladesh, built with React, Next.js, Node.js & MongoDB.`,
  keywords: [
    "Towfiqul Islam projects",
    "তৌফিকুল ইসলাম প্রজেক্ট",
    "Towfiqul Islam portfolio projects",
    "MERN Stack projects Bangladesh",
    "React projects Towfiqul",
    "Next.js projects Bangladesh",
  ],
  alternates: { canonical: "/navLinks/projects" },
  openGraph: {
    title: "Projects by Towfiqul Islam | তৌফিকুল ইসলাম | MERN Stack Developer",
    description:
      `Explore ${projectCount}+ projects built by Towfiqul Islam (তৌফিকুল ইসলাম) using React, Next.js, Node.js, and MongoDB.`,
    url: `${BASE}/navLinks/projects`,
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Projects by Towfiqul Islam",
      },
    ],
  },
  };
}

const buildProjectsJsonLd = (allProjects) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE}/navLinks/projects` },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${BASE}/navLinks/projects#itemlist`,
      name: "All Projects by Towfiqul Islam",
      numberOfItems: allProjects.length,
      itemListElement: allProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: project.liveLink,
          keywords: project.tags?.join(", "),
          author: { "@id": `${BASE}/#person` },
        },
      })),
    },
  ],
});

export default async function ProjectsLayout({ children }) {
  const allProjects = await getAllProjects();
  const projectsJsonLd = buildProjectsJsonLd(allProjects);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <h1 className="sr-only">Projects | Towfiqul Islam | তৌফিকুল ইসলাম</h1>
      <div className="bg-[#08090a] pt-18 sm:pt-20">
        <Breadcrumb items={[{ name: "Projects" }]} />
      </div>
      {children}
    </>
  );
}
