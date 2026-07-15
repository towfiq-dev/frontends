import Contact from "@/components/contact/Contact";
import Breadcrumb from "@/components/shared/breadcrumb/Breadcrumb";

import { SITE_URL as BASE, GITHUB_URL, LINKEDIN_URL, TWITTER_URL, FACEBOOK_URL } from "@/components/lib/constants";

export const metadata = {
  title: "Contact Towfiqul Islam | তৌফিকুল ইসলাম | Hire a MERN Developer",
  description:
    "Get in touch with Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Bangladesh. Available for freelance projects and full-time opportunities.",
  keywords: [
    "Contact Towfiqul Islam",
    "তৌফিকুল ইসলাম যোগাযোগ",
    "Hire Towfiqul Islam",
    "Hire MERN Developer Bangladesh",
    "Freelance React Developer Bangladesh",
    "Towfiqul Islam email",
  ],
  alternates: { canonical: "/navLinks/contact" },
  openGraph: {
    title: "Contact Towfiqul Islam | তৌফিকুল ইসলাম | Hire a MERN Developer",
    description:
      "Reach out to Towfiqul Islam (তৌফিকুল ইসলাম) for web development projects, collaborations, or job opportunities.",
    url: `${BASE}/navLinks/contact`,
    images: [
      {
        url: `${BASE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact Towfiqul Islam",
      },
    ],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${BASE}/navLinks/contact/#contactpage`,
      url: `${BASE}/navLinks/contact`,
      name: "Contact Towfiqul Islam | তৌফিকুল ইসলাম",
      description:
        "Contact page of Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Bangladesh.",
      mainEntity: { "@id": `${BASE}/#person` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE}/navLinks/contact` },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: "Towfiqul Islam",
      alternateName: ["তৌফিকুল ইসলাম", "Towfiq Islam"],
      email: "towfiqulislam017399@gmail.com",
      telephone: "+8801739943577",
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
    },
  ],
};

const ContactSection = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <h1 className="sr-only">Contact Towfiqul Islam | তৌফিকুল ইসলাম</h1>
      <div className="bg-black mt-18 sm:mt-20">
        <Breadcrumb items={[{ name: "Contact" }]} />
      </div>
      <Contact />
    </>
  );
};

export default ContactSection;
