import React from "react";
import Hero from "@/components/hero/Hero";
import GetTouch from "@/components/getTouch/GetTouch";
import WhatDo from "@/components/whatIDo/WhatDo";
import States from "@/components/states/States";
import ProjectSection from "@/components/projectsSection/projectCard/ProjectSection";
import TechStackHome from "@/components/techStackHome/TechStackHome";
import Contact from "@/components/contact/Contact";
import Education from "@/components/education/Education";
import TrainingSection from "@/components/trainingSection/TrainingSection";
import GitHubActivityGraph from "@/components/shared/GitHubActivityGraph/GitHubActivityGraph";
import { getAllProjects, getTechStackCount, getEducationData, getCourses } from "@/components/lib/getPortfolioData";
import { SITE_URL as BASE, GITHUB_URL, LINKEDIN_URL, TWITTER_URL, FACEBOOK_URL } from "@/components/lib/constants";

export const metadata = {
  title: "Towfiqul Islam | তৌফিকুল ইসলাম | MERN Stack Developer Portfolio",
  description:
    "Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Bangladesh. React, Next.js, Node.js & MongoDB. Explore projects, skills, and hire me.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Towfiqul Islam | তৌফিকুল ইসলাম | MERN Stack Developer",
    description:
      "Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Bangladesh building fast, elegant web applications with React, Next.js, Node.js & MongoDB.",
    url: BASE,
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Towfiqul Islam — MERN Stack Developer",
      },
    ],
  },
};

// ── Structured Data ────────────────────────────────────────────────────────────

const buildJsonLd = (allProjects) => ({
  "@context": "https://schema.org",
  "@graph": [
    // 1. Person schema — the most important one for name-based search & Knowledge Panel
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: "Towfiqul Islam",
      givenName: "Towfiqul",
      familyName: "Islam",
      alternateName: [
        "Towfiq Islam",
        "Towfiqul Islam Developer",
        "Towfiqul Islam MERN",
        "Towfiq Dev",
        "তৌফিকুল ইসলাম",
        "তৌফিক ইসলাম",
        "Md Towfiqul Islam",
      ],
      url: BASE,
      image: {
        "@type": "ImageObject",
        "@id": `${BASE}/#personimage`,
        url: `${BASE}/towfiq-profile.jpg`,
        width: 912,
        height: 1136,
        caption: "Towfiqul Islam — Full Stack MERN Developer from Bangladesh",
        representativeOfPage: true,
      },
      jobTitle: "Full Stack MERN Developer",
      description:
        "Towfiqul Islam (তৌফিকুল ইসলাম) is a Full Stack Web Developer from Bangladesh, specializing in React, Next.js, Node.js, MongoDB, and Express (MERN Stack). He builds scalable, high-performance web applications.",
      nationality: "Bangladeshi",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressRegion: "Dhaka Division",
        addressCountry: "BD",
        postalCode: "1000",
      },
      email: "towfiqulislam017399@gmail.com",
      telephone: "+8801739943577",
      birthPlace: {
        "@type": "Place",
        name: "Bangladesh",
      },
      knowsLanguage: ["Bengali", "English"],
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "Express.js",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
        "Firebase",
        "Docker",
        "Prisma",
        "Git",
        "REST API",
        "Full Stack Web Development",
        "MERN Stack Development",
        "Frontend Development",
        "Backend Development",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Full Stack Web Developer",
        description: "Full Stack MERN Developer specializing in React, Next.js, Node.js, and MongoDB",
        occupationLocation: {
          "@type": "City",
          name: "Dhaka",
        },
        skills: "React, Next.js, Node.js, MongoDB, Express.js, JavaScript, TypeScript, Tailwind CSS",
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          name: "base",
          currency: "BDT",
          duration: "P1M",
        },
      },
      sameAs: [
        GITHUB_URL,
        LINKEDIN_URL,
        TWITTER_URL,
        FACEBOOK_URL,
        BASE,
      ],
      mainEntityOfPage: {
        "@type": "ProfilePage",
        "@id": `${BASE}/#profilepage`,
      },
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
    },

    // 2. WebSite schema — enables Google Sitelinks Search Box
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Towfiqul Islam | Portfolio",
      alternateName: "তৌফিকুল ইসলাম পোর্টফোলিও",
      description:
        "Official portfolio of Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Stack Developer from Bangladesh.",
      author: { "@id": `${BASE}/#person` },
      publisher: { "@id": `${BASE}/#person` },
      inLanguage: ["en-US", "bn-BD"],
      copyrightYear: "2024",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // 3. ProfilePage schema — tells Google this is a person's profile page
    {
      "@type": "ProfilePage",
      "@id": `${BASE}/#profilepage`,
      url: BASE,
      name: "Towfiqul Islam — Full Stack Developer Portfolio",
      description:
        "Official portfolio and profile of Towfiqul Islam (তৌফিকুল ইসলাম), a Full Stack MERN Developer specializing in React and Next.js from Bangladesh.",
      about: { "@id": `${BASE}/#person` },
      mainEntity: { "@id": `${BASE}/#person` },
      dateCreated: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      inLanguage: "en-US",
      isPartOf: { "@id": `${BASE}/#website` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        ],
      },
    },

    // 4. ItemList of projects — Google can show projects in rich results
    // Generated from the live project data (allProjects) so it never goes
    // stale when projects are added/removed/reordered on the site.
    {
      "@type": "ItemList",
      "@id": `${BASE}/#projects`,
      name: "Projects by Towfiqul Islam",
      description:
        "A selection of web development projects built by Towfiqul Islam (তৌফিকুল ইসলাম).",
      numberOfItems: allProjects.slice(0, 3).length,
      itemListElement: allProjects.slice(0, 3).map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: project.liveLink,
        description: project.description,
      })),
    },
    // 4b. Full catalog ItemList — reflects the entire current project list
    {
      "@type": "ItemList",
      "@id": `${BASE}/#all-projects`,
      name: "All Projects by Towfiqul Islam",
      description:
        "The complete, up-to-date list of projects built by Towfiqul Islam (তৌফিকুল ইসলাম).",
      numberOfItems: allProjects.length,
      itemListElement: allProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${BASE}/navLinks/projects`,
      })),
    },

    // 5. BreadcrumbList for home page
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      ],
    },

    // 6. FAQPage — increases rich snippet chances
    {
      "@type": "FAQPage",
      "@id": `${BASE}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Towfiqul Islam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Towfiqul Islam (তৌফিকুল ইসলাম) is a Full Stack MERN Developer from Dhaka, Bangladesh, specializing in React, Next.js, Node.js, and MongoDB. He builds scalable, high-performance web applications.",
          },
        },
        {
          "@type": "Question",
          name: "What does Towfiqul Islam do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Towfiqul Islam is a Full Stack Web Developer who builds modern web applications using the MERN stack (MongoDB, Express.js, React, Node.js) along with Next.js, TypeScript, Tailwind CSS, and cloud services.",
          },
        },
        {
          "@type": "Question",
          name: "How to contact Towfiqul Islam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can contact Towfiqul Islam via email at towfiqulislam017399@gmail.com or phone at +8801739943577. He is also available on LinkedIn, GitHub, and Facebook.",
          },
        },
        {
          "@type": "Question",
          name: "তৌফিকুল ইসলাম কে?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "তৌফিকুল ইসলাম বাংলাদেশের ঢাকা থেকে একজন ফুল স্ট্যাক MERN ডেভেলপার। তিনি React, Next.js, Node.js এবং MongoDB দিয়ে আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি করেন।",
          },
        },
      ],
    },
  ],
});

const Home = async () => {
  const allProjects = await getAllProjects();
  const [techStackCount, educationData, courses] = await Promise.all([
    getTechStackCount(),
    getEducationData(),
    getCourses(),
  ]);
  const projectCount = allProjects.length;
  const jsonLd = buildJsonLd(allProjects);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <Hero />
        <States projectCount={projectCount} techStackCount={techStackCount} />
        <GitHubActivityGraph />
        <ProjectSection projects={allProjects} />
        <TrainingSection courses={courses} />
        <WhatDo />
        <TechStackHome />
        <GetTouch />
        <Education data={educationData} />
        <Contact />
      </div>
    </>
  );
};

export default Home;
