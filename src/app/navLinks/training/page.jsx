import CertificatesSection from "@/components/certificates/CertificatesSection";
import Breadcrumb from "@/components/shared/breadcrumb/Breadcrumb";
import { getCourses } from "@/components/lib/getPortfolioData";

import { SITE_URL as BASE } from "@/components/lib/constants";

export const metadata = {
  title: "Training & Certificates | Towfiqul Islam | তৌফিকুল ইসলাম",
  description:
    "Towfiqul Islam's (তৌফিকুল ইসলাম) training and certifications — Complete Web Development (Programming Hero), Computer Basic & ICT Application.",
  keywords: [
    "Towfiqul Islam certificate",
    "তৌফিকুল ইসলাম সার্টিফিকেট",
    "Towfiqul Islam training",
    "Programming Hero certificate",
    "MERN Stack certificate Bangladesh",
  ],
  alternates: { canonical: "/navLinks/training" },
  openGraph: {
    title: "Training & Certificates | Towfiqul Islam | তৌফিকুল ইসলাম",
    description:
      "Professional certifications and training completed by Towfiqul Islam (তৌফিকুল ইসলাম) in web development and MERN Stack.",
    url: `${BASE}/navLinks/training`,
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Training & Certificates — Towfiqul Islam",
      },
    ],
  },
};

const buildTrainingJsonLd = (courses) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Training & Certificates", item: `${BASE}/navLinks/training` },
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: "Towfiqul Islam",
      alternateName: ["তৌফিকুল ইসলাম", "Towfiq Islam"],
      hasCredential: courses.map((course) => ({
        "@type": "EducationalOccupationalCredential",
        name: course.title,
        recognizedBy: {
          "@type": "Organization",
          name: course.institution,
        },
        dateCreated: course.issuedDate,
        credentialCategory: course.category,
        identifier: course.badge,
        description: course.description,
      })),
    },
  ],
});

const TrainingPage = async () => {
  const courses = await getCourses();
  const trainingJsonLd = buildTrainingJsonLd(courses);
  return (
    <div className="mt-18 mb-35">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trainingJsonLd) }}
      />
      <h1 className="sr-only">Training & Certificates | Towfiqul Islam | তৌফিকুল ইসলাম</h1>
      <Breadcrumb items={[{ name: "Training & Certificates" }]} />
      <CertificatesSection courses={courses} />
    </div>
  );
};

export default TrainingPage;
