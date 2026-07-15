import {
PH,
DYD,
PHCert,
DYDCert
}
  from "@/components/lib/courseApiImage";


export const courses = [
  {
    id: 1,
    title: "Complete Web Development Course",
    institution: "Programming Hero",
    instructor: "Jhankar Mahbub",
    issuedDate: "July 2026",
    category: "Full Stack",
    badge: "WEB13-1086",
    tags: ["React", "Next.js", "JavaScript", "Node.js", "MongoDB", "Express.js", "HTML5", "CSS3"],
    description:
      "This was an intensive learning program focused on modern web technologies. Through this course, I received comprehensive guidance ranging from front-end design to back-end database management. During the program, I completed numerous real-world projects that significantly enhanced my problem-solving skills and ability to collaborate effectively within a team environment",
    projects: [
      { name: "SkillSwap - Freelancing Marketplace Platform", link: "https://skill-swap-frontend-server.vercel.app" },
      { name: "Wanderlust - Premium Travel & Tourism Platform", link: "https://wanderlust-express-js.vercel.app" },
      { name: "CarePulse - Next-Generation Hospital Management & Appointment System", link: "https://doctor-appointment-manager-one.vercel.app" },
      { name: "TilesPro - Online Ceramic Product Gallery", link: "https://tiles-gallery-app.vercel.app" },
      { name: "The Dragon News", link: "https://the-dragon-news-ten-murex.vercel.app" },
    ],
    color: "#10b981",
    gradient: "from-purple-600 to-fuchsia-500",
    icon: "💻",
    institutionLogo: PH,
    certificateImage: PHCert,
  },
  
  {
    id: 2,
    title: "Computer Basic & ICT Application",
    institution: "Department of Youth Development",
    instructor: "Ministry of Youth and Sports",
    issuedDate: "December 2025",
    category: "Advanced",
    badge: "197464",
    tags: ["Microsoft Office", "Data Entry", "Photoshop", "Graphic Design"],
    description:
      "Completed a comprehensive ICT training program conducted by the Ministry of Youth and Sports. This course provided a solid foundation in computer operations, office productivity software, and internet applications. It equipped me with the essential digital literacy and technical skills required to excel in today’s technology-driven professional environment",
    projects: [
      { name: "Automated Business Management System (Excel & Word)", link: "" },
      { name: "E-commerce Product Cataloging & Inventory Mapping", link: "" },
      { name: "Professional Product Retouching & Web Asset Optimization", link: "" },
      { name: "Brand Identity Design for a Tech Startup", link: "" },
      { name: "Personal Portfolio Branding & Content Strategy", link: "" },
    ],
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-500",
    icon: "💻",
    institutionLogo: DYD,
    certificateImage: DYDCert,
  },
];