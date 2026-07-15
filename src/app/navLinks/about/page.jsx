import React from "react";
import { Download, CheckCircle2, Code2 } from "lucide-react";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import Image from "next/image";
import profileImageUrl from "@/assets/myImages/towfiq.jpg";
import Link from "next/link";
import GitHubActivityGraph from "@/components/shared/GitHubActivityGraph/GitHubActivityGraph";
import StatsCoreStack from "@/components/about/stats&CoreStack/Stats&CoreStack";
import ResumeButton from "@/components/shared/resumeModal/ResumeButton";
import { DOWNLOAD_CV_POSITIONS } from "@/components/allAPI/downloadCVUrlApi/DownloadCVUrlApi";
import RevealOnScroll from "@/components/shared/revealOnScroll/RevealOnScroll";
import { getProjectCount } from "@/components/lib/getPortfolioData";
import Breadcrumb from "@/components/shared/breadcrumb/Breadcrumb";
import { SITE_URL as BASE, GITHUB_CONTRIBUTIONS, GITHUB_URL, LINKEDIN_URL, TWITTER_URL, FACEBOOK_URL } from "@/components/lib/constants";


export async function generateMetadata() {
  const projectCount = await getProjectCount();
  return {
  title: "About Towfiqul Islam | তৌফিকুল ইসলাম | Full Stack MERN Developer",
  description:
    `Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Dhaka, Bangladesh. React, Next.js, Node.js, MongoDB. 1+ years experience, ${projectCount}+ projects.`,
  keywords: [
    "Towfiqul Islam",
    "তৌফিকুল ইসলাম",
    "About Towfiqul Islam",
    "Towfiqul Islam developer Bangladesh",
    "MERN Stack Developer Dhaka",
    "Full Stack Developer Bangladesh",
  ],
  alternates: { canonical: "/navLinks/about" },
  openGraph: {
    title: "About Towfiqul Islam | তৌফিকুল ইসলাম | Full Stack MERN Developer",
    description:
      "Towfiqul Islam (তৌফিকুল ইসলাম) is a passionate Full Stack Developer from Dhaka, Bangladesh specializing in MERN Stack, React, and Next.js.",
    url: `${BASE}/navLinks/about`,
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Towfiqul Islam — About",
      },
    ],
  },
  };
}



const buildAboutJsonLd = (projectCount) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${BASE}/navLinks/about/#aboutpage`,
      url: `${BASE}/navLinks/about`,
      name: "About Towfiqul Islam | তৌফিকুল ইসলাম",
      description:
        "About page of Towfiqul Islam (তৌফিকুল ইসলাম), a Full Stack MERN Stack Developer from Dhaka, Bangladesh.",
      inLanguage: ["en-US", "bn-BD"],
      mainEntity: {
        "@type": "Person",
        "@id": `${BASE}/#person`,
        name: "Towfiqul Islam",
        alternateName: ["তৌফিকুল ইসলাম", "Towfiq Islam", "তৌফিক ইসলাম"],
        jobTitle: "Full Stack MERN Developer",
        description:
          `Towfiqul Islam (তৌফিকুল ইসলাম) is a Full Stack Web Developer from Dhaka, Bangladesh, specializing in React, Next.js, Node.js, and MongoDB. He has completed ${projectCount}+ projects and has ${GITHUB_CONTRIBUTIONS}+ GitHub contributions.`,
        image: {
          "@type": "ImageObject",
          url: `${BASE}/og-image.png`,
          width: 1200,
          height: 630,
        },
        url: BASE,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
        sameAs: [
          GITHUB_URL,
          LINKEDIN_URL,
          TWITTER_URL,
          FACEBOOK_URL,
        ],
        knowsAbout: [
          "React", "Next.js", "Node.js", "MongoDB", "Express.js",
          "JavaScript", "TypeScript", "Tailwind CSS", "Redux", "Docker",
        ],
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "National University Bangladesh",
          },
        ],
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "About", item: `${BASE}/navLinks/about` },
        ],
      },
    },
  ],
});

const expertise = [
  "React & Next.js Applications",
  "Database Design & Optimization",
  "Responsive & Accessible UI",
  "Cloud Deployment (AWS, Vercel)",
  "Performance Optimization",
  "Global State Management (Redux)",
  "Secure Authentication (Firebase, BetterAuth)",
  "Modern CSS Frameworks (Tailwind, DaisyUI)",
  "Server-side Logic (Node.js, Express.js)",
  "Version Control (Git & GitHub)",
];

const AboutMe = async () => {
  const projectCount = await getProjectCount();
  const aboutJsonLd = buildAboutJsonLd(projectCount);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <section
        className="bg-black text-white py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-label="About Towfiqul Islam — Full Stack MERN Developer from Bangladesh"
      >
        <div className="max-w-7xl mx-auto pt-14 sm:pt-6">
          <Breadcrumb items={[{ name: "About" }]} bare className="mb-8" />

          {/* Section Header */}
          <RevealOnScroll>
            <div className="text-center mb-12 md:mb-20">
              <span className="px-4 py-1.5 border border-cyan-900/50 rounded-full text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase bg-cyan-950/20">
                About Me
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-5 mb-5 tracking-tight">
                Get to know{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  who I am
                </span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                A passionate developer dedicated to turning complex ideas into elegant, high-performance
                digital experiences.
              </p>
            </div>
          </RevealOnScroll>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center mb-14 md:mb-20">

            {/* Left: Image */}
            <RevealOnScroll>
              <div className="relative group max-w-sm mx-auto lg:max-w-none w-full">
                <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-[#111] z-10">
                  <Image
                    width={600}
                    height={700}
                    src={profileImageUrl}
                    alt="Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Dhaka, Bangladesh"
                    className="w-full h-auto object-cover group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-10 right-4 sm:right-8 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-2xl z-20">
                  <div className="p-2.5 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl ring-4 ring-purple-600/20">
                    <Code2 size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-black leading-none text-white">1+ Year</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Coding Experience</p>
                  </div>
                </div>

                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              </div>
            </RevealOnScroll>

            {/* Right: Bio */}
            <RevealOnScroll>
              <div className="flex flex-col justify-center">
                <span className="text-cyan-400 text-xs md:text-[17px] font-black tracking-widest uppercase mb-5 mt-5 block">
                  Professional Bio
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-snug">
                  Full Stack Web Developer & <br />
                  <span className="text-gray-400">React / Next.js Specialist</span>
                </h2>

                <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                  <p>
                    I&apos;m{" "}
                    <span className="text-white font-semibold">Towfiqul Islam</span> — a Full Stack Web
                    Developer from <span className="text-white font-semibold">Dhaka, Bangladesh</span>,
                    specializing in{" "}
                    <span className="text-cyan-400">React & Next.js</span>. I focus on building
                    solutions that are not only visually stunning but also technically robust.
                  </p>
                  <p>
                    Expert in the{" "}
                    <span className="text-white font-medium border-b border-gray-700">MERN stack</span>{" "}
                    and modern cloud architectures. I bridge the gap between design and scalable engineering.
                  </p>
                </div>

                {/* Expertise Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {expertise.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] p-3 rounded-xl hover:bg-white/[0.06] transition-all"
                    >
                      <CheckCircle2 size={16} className="text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-300 text-xs sm:text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/navLinks/contact"
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Let&apos;s Work Together <FaArrowRight size={12} />
                  </Link>

                  <ResumeButton
                    aria-label="Download CV — select a role"
                    positions={DOWNLOAD_CV_POSITIONS}
                    mode="download"
                    title="Which role are you hiring for?"
                    className="group py-3 px-5 cursor-pointer rounded-full bg-neutral-900 border border-neutral-700 hover:border-neutral-500 flex items-center gap-2 transition-all duration-300"
                  >
                    <Download size={16} className="text-neutral-300 group-hover:text-white" />
                    <span className="text-sm font-semibold text-neutral-300 group-hover:text-white">
                      Download CV
                    </span>
                  </ResumeButton>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <StatsCoreStack />
          <GitHubActivityGraph />
        </div>
      </section>
    </>
  );
};

export default AboutMe;
