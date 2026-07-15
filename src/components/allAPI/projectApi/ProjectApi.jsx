import {
skillSwapImg,
keenKeeperImg,
tilesProImg,
dgToolsImg,
githubIssueTrackerImg,
bookVibeImg,
dragonNewsImg,
g3ArchitectsImg,
greenEarthImg,
jobTrackerImg,
englishIsEasyImg,
payooImg,
appstore,
wanderlustImg,
carePulseImg
}
  from "@/components/lib/projectApiImage";

// Static project catalog — single source of truth consumed by the projects
// page, home page preview, and SEO structured data (JSON-LD).
export const allProjects = [
  {
    id: 1,
    title: "SkillSwap - Freelancing Marketplace Platform",
    "description": "SkillSwap is a full-featured freelancing marketplace that connects skilled professionals with clients who need work done. Inspired by platforms like Fiverr and Upwork, it enables clients to post tasks, review proposals, and pay freelancers securely — all within a single, intuitive platform. With role-based dashboards for clients, freelancers, and admins, SkillSwap delivers a transparent, efficient, and trustworthy freelancing experience.",
    features: [
      "Role-based authentication with email/password and Google OAuth via BetterAuth",
      "Task posting, browsing, and multi-criteria search & filtering system",
      "Proposal submission, acceptance, and rejection workflow for clients and freelancers",
      "Secure Stripe Checkout integration for seamless task payments",
      "Dedicated dashboards for clients, freelancers, and admins with real-time stats",
      "Deliverable submission and active project tracking for freelancers",
      "Admin panel for user management (block/unblock) and platform monitoring",
      "Blocked user guard with automatic session invalidation"
    ],
    tags: [
      "Next.js",
      "React",
      "TailwindCSS",
      "Framer Motion",
      "HeroUI",
      "MongoDB",
      "BetterAuth",
      "Node.js",
      "Express.js",
      "Stripe"
    ],
    category: "Full Stack",
    image: skillSwapImg,
    liveLink: "https://skill-swap-frontend-server.vercel.app",
    clientSourceCode: "https://github.com/towfiq-dev/skillSwap-frontend-server",
    serverSourceCode: "https://github.com/towfiq-dev/skillSwap-backend-server"
  },
  {
    id: 2,
    title: "Wanderlust - Premium Travel & Tourism Platform",
    description:
      "Wanderlust is an immersive travel and destination management platform crafted for modern explorers. It offers seamless hotel and tour booking, intelligent destination filtering, dynamic search capabilities, and user-driven testimonials. Designed with a stunning user experience, it simplifies travel planning and bridges the gap between travelers and their dream destinations.",
    features: [
  "Advanced destination search with category, price-range, and rating/name sorting filters",
  "Dynamic booking engine for curated tour packages with real-time reservation and cancellation",
  "Secure authentication and session handling via BetterAuth with JWT/JWKS verification on the API",
  "Admin dashboard with live platform stats — total destinations, bookings, and aggregated revenue",
  "Full CRUD destination management panel for admins to add, edit, and remove listings",
  "Personal bookings dashboard for tracking and managing user reservations",
  "Featured destinations carousel and user testimonials showcase on the homepage",
  "RESTful Express.js + MongoDB backend with token-protected routes and CORS-enabled API"
],
    tags: ["Next.js", "JS", "TailwindCSS", "Framer Motion", "HeroUI", "MongoDB", "BetterAuth", "Node.js", "Express.js"],
    category: "Full Stack",
    image: wanderlustImg,
    liveLink: "https://wanderlust-express-js.vercel.app",
    clientSourceCode: 'https://github.com/towfiq-dev/wanderlust-express-js',
    serverSourceCode: 'https://github.com/towfiq-dev/wandelust-server'
  },
  {
    id: 3,
    title: "CarePulse - Next-Generation Hospital Management & Appointment System",
    description:
      "CarePulse is a comprehensive, production-ready healthcare management platform built to streamline patient-doctor interactions. It features an advanced appointment scheduling engine, interactive specialist search with multi-criteria filtering, and an intuitive hospital dashboard. Designed with absolute pixel-perfect precision, it ensures a friction-free experience for patients seeking elite medical assistance.",
    features: [
  "Smart doctor discovery with specialty, experience, and dynamic rating/review display",
  "Real-time appointment booking engine with fee calculation and appointment date tracking",
  "Editable user profile management (name, phone, location, bio, avatar) synced with MongoDB",
  "Personal dashboard with booking overview stats — total spend, upcoming visits, unique doctors seen",
  "Full booking lifecycle management — create, update, and cancel appointments from the dashboard",
  "Secure authentication via BetterAuth with JWT/JWKS verification protecting all sensitive API routes",
  "Fluid micro-interactions and animated UI powered by Framer Motion and HeroUI components",
  "RESTful Express.js + MongoDB backend with dedicated collections for appointments, bookings, and profiles"
],
    tags: ["Next.js", "JS", "TailwindCSS", "Framer Motion", "HeroUI", "MongoDB", "BetterAuth", "Node.js", "Express.js"],
    category: "Full Stack",
    image: carePulseImg,
    liveLink: "https://doctor-appointment-manager-one.vercel.app",
    clientSourceCode: 'https://github.com/towfiq-dev/b13-a09-full-stack-web',
    serverSourceCode: 'https://github.com/towfiq-dev/b13-a09-backend-server'
  },
  {
    id: 4,
    title: "TilesPro - Online Ceramic Product Gallery",
    description:
      "TilesPro is a high-end digital showcase designed for the ceramic industry, offering a seamless and immersive experience for exploring premium tile collections. The application features advanced categorization, allowing users to dive deep into technical specifications, aesthetic details, and material quality. Beyond browsing, it includes a robust user profile management system to save preferences and curate personalized galleries for interior design inspiration.",
    features: [
      "Advanced product categorization and filtering",
      "Detailed technical specifications for tiles",
      "User profile management for curated galleries",
      "Secure authentication with Better-Auth"
    ],
    tags: ["Next.js", "React", "TailwindCSS", "MongoDB", "Better-Auth"],
    category: "Full Stack",
    image: tilesProImg,
    liveLink: "https://tiles-gallery-app.vercel.app",
    sourceCode: 'https://github.com/towfiq-dev/tiles-gallery-app',
  },
  {
    id: 5,
    title: "FriendShip Management System",
    description:
      "FriendShip Management is a sophisticated personal relationship management (PRM) platform designed to bridge the gap in our busy modern lives. It empowers users to foster meaningful connections by tracking interaction history and intelligently identifying friends who may need more attention. With its intuitive interface, you can manage your social circle effectively, ensuring no important relationship is overlooked.",
    features: [
      "Personal Relationship Management (PRM) logic",
      "Interaction history tracking",
      "Priority alerts for neglected connections",
      "Intuitive dashboard for social circle management"
    ],
    tags: ["JS", "React", "TailwindCSS"],
    category: "Full Stack",
    image: keenKeeperImg,
    liveLink: "https://friendship-management.netlify.app",
    sourceCode: 'https://github.com/towfiq-dev/friendship-management',
  },
  {
    id: 6,
    title: "DigiTools - Premium Digital Tools Marketplace",
    description:
      "DigiTools is a dynamic marketplace engineered for the modern digital creator and professional. This high-performance platform serves as a curated hub where users can discover, filter, and manage a wide array of premium digital assets and cutting-edge AI tools. With smooth animations and a focus on speed, it provides an efficient workflow for businesses and individuals looking to enhance their productivity with top-tier digital resources.",
    features: [
      "Curated marketplace for digital assets",
      "High-performance filtering system",
      "Smooth UI animations using Framer Motion",
      "Optimized workflow for creators and professionals"
    ],
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    category: "Full Stack",
    image: dgToolsImg,
    liveLink: "https://digitoolls-platfrom.netlify.app",
    sourceCode: 'https://github.com/towfiq-dev/digiTools-Platform',
  },
  {
    id: 7,
    title: "The Dragon News",
    description:
      "The Dragon News is a comprehensive, full-stack news portal that delivers a high-speed and dynamic reading experience. Built for reliability, it features real-time category-based filtering and a sophisticated news feed that keeps users updated on the latest stories. The platform is equipped with secure authentication via Better-Auth and a responsive admin dashboard, making content management and user engagement both secure and effortless.",
    features: [
      "Real-time news feed with category filtering",
      "Secure admin dashboard for content management",
      "Robust user authentication",
      "Fully responsive and high-speed delivery"
    ],
    tags: ["Next.js", "MongoDB", "Better-Auth", "TailwindCSS"],
    category: "Full Stack",
    image: dragonNewsImg,
    liveLink: "https://the-dragon-news-ten-murex.vercel.app",
    sourceCode: 'https://github.com/towfiq-dev/the-dragon-news',
  },
  {
    id: 8,
    title: "AppStore – Productivity Hub",
    description:
      "This project is an expansive application ecosystem designed to function as a centralized marketplace and management hub. It offers a multi-layered experience, featuring a trending apps showcase, a powerful search and filtering grid for all applications, and a personalized tracking system for installed software. Additionally, the platform integrates detailed review and rating analytics to help users make informed decisions about their productivity tools.",
    features: [
      "Trending applications showcase",
      "Powerful grid-based search and filtering",
      "Personalized tracking for installed apps",
      "Review and rating analytics integration"
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    category: "Full Stack",
    image: appstore,
    liveLink: "https://apps-stored.netlify.app",
    sourceCode: 'https://github.com/towfiq-dev/apps-store',
  },
  {
    id: 9,
    title: "Payoo MFS Application",
    description:
      "Payoo is a streamlined Mobile Financial Service (MFS) solution that simplifies digital wallet management for everyday users. The application provides a secure environment for essential financial tasks, including adding funds, cashing out, and instant peer-to-peer money transfers. It also features a comprehensive transaction history module, allowing users to monitor their spending habits and manage their digital finances with confidence and ease.",
    features: [
      "Secure digital wallet management",
      "Peer-to-peer money transfer and cash-out",
      "Real-time transaction history tracking",
      "Minimalist and secure login system"
    ],
    tags: ["HTML", "CSS", "JS", "TailwindCSS"],
    category: "Frontend / Vanilla JS",
    image: payooImg,
    liveLink: "https://towfiq-dev.github.io/Payooo-mobile-bank",
    sourceCode: 'https://github.com/towfiq-dev/Payooo-mobile-bank',
  },
  {
    id: 10,
    title: "English Is Easy!!",
    description:
      "English Is Easy is a vibrant, interactive educational platform tailored to simplify the complexities of English vocabulary and linguistics. Designed with the learner in mind, it provides a clean and logically categorized environment where users can discover new words and their meanings. Through engaging UI components and interactive practice modules, the platform transforms traditional learning into an accessible and enjoyable digital experience.",
    features: [
      "Interactive vocabulary learning modules",
      "Clean, categorized word navigation",
      "Dynamic DOM manipulation for user interaction",
      "Modern and engaging educational UI"
    ],
    tags: ["JS", "TailwindCSS", "DOM Manipulation"],
    category: "Educational",
    image: englishIsEasyImg,
    liveLink: "https://towfiq-dev.github.io/English-Janala",
    sourceCode: 'https://github.com/towfiq-dev/English-Janala',
  },
  {
    id: 11,
    title: "Book Vibe",
    description:
      "Book Vibe is an all-encompassing discovery and management platform built for passionate readers and book enthusiasts. It allows users to navigate through a vast library of titles, explore community reviews, and gain insights into literary works. The application also features a personalized wishlist system and secure user accounts, enabling readers to curate their own digital library and track their reading progress over time.",
    features: [
      "Personalized reading wishlist and library",
      "Community reviews and rating system",
      "Vast book discovery with detailed metadata",
      "Secure authentication and user progress tracking"
    ],
    tags: ["JS", "React", "Next.js", "Better-Auth", "TailwindCSS"],
    category: "Full Stack",
    image: bookVibeImg,
    liveLink: "https://explore-books-vibe.netlify.app",
    sourceCode: 'https://github.com/towfiq-dev/book-vibe',
  },
  {
    id: 12,
    title: "GitHub Issue Tracker",
    description:
      "Inspired by the industry-standard GitHub workflow, this project is a robust issue-tracking system built for technical teams. It provides a structured, grid-based interface where developers can create, prioritize, and monitor bugs or feature requests in real-time. With secure authentication and status update capabilities, it ensures that every task is tracked from inception to resolution, enhancing collaboration and project transparency.",
    features: [
      "Real-time issue creation and monitoring",
      "Grid-based UI for technical workflow management",
      "Role-based status updates and tracking",
      "Full stack integration with MongoDB and Better-Auth"
    ],
    tags: ["Next.js", "React", "TailwindCSS", "MongoDB", "Better-Auth"],
    category: "Full Stack",
    image: githubIssueTrackerImg,
    liveLink: "https://towfiq-dev.github.io/Github-Issue-Tracker",
    sourceCode: 'https://github.com/towfiq-dev/Github-Issue-Tracker',
  },
  {
    id: 13,
    title: "G3 Architects",
    description:
      "G3 Architects is a visually stunning landing page meticulously crafted for professional architectural firms and design studios. It combines a sleek, modern aesthetic with high-quality imagery to showcase architectural excellence through a high-impact hero section and service highlights. The design includes a dedicated sponsorship area and is fully optimized for a smooth, high-speed user experience that emphasizes professional credibility.",
    features: [
      "High-impact hero section with professional imagery",
      "Client sponsorship showcase",
      "Architectural service highlights module",
      "Fully responsive and performance-optimized design"
    ],
    tags: ["HTML5", "TailwindCSS", "JavaScript"],
    category: "Frontend",
    image: g3ArchitectsImg,
    liveLink: "https://towfiq-dev.github.io/g3-architect",
    sourceCode: 'https://github.com/towfiq-dev/g3-architect',
  },
  {
    id: 14,
    title: "Green Earth - Tree Plantation",
    description:
      "Green Earth is a purpose-driven e-commerce platform dedicated to promoting environmental sustainability through tree plantation. The site provides a clean, nature-inspired shopping experience where users can explore various species of trees, understand their environmental benefits, and manage a cart for purchase. Its responsive grid layout ensures that the mission of greening the planet is accessible to everyone, across all devices.",
    features: [
      "Environmental impact information for tree species",
      "Smooth cart management and browsing system",
      "Nature-inspired aesthetic and grid layout",
      "E-commerce functionality for sustainable purchases"
    ],
    tags: ["HTML5", "TailwindCSS", "JavaScript"],
    category: "Frontend",
    image: greenEarthImg,
    liveLink: "https://towfiq-dev.github.io/green-earth-main",
    sourceCode: 'https://github.com/towfiq-dev/green-earth-main',
  },
  {
    id: 15,
    title: "Job Application Tracker",
    description:
      "The Job Application Tracker is a highly functional productivity dashboard built to streamline the often-overwhelming job search process. It provides a clear visual summary of the user's progress through specialized cards for total applications, scheduled interviews, and rejections. With advanced filtering and real-time status tracking, this minimalist interface helps job seekers stay organized and focused on their career goals.",
    features: [
      "Visual analytics cards for application progress",
      "Advanced filtering for job listings",
      "Real-time status tracking (Applied/Interview/Rejected)",
      "Minimalist dashboard for focused productivity"
    ],
    tags: ["React", "TailwindCSS", "JavaScript"],
    category: "Frontend/React",
    image: jobTrackerImg,
    liveLink: "https://towfiq-dev.github.io/PH-Job-Tracker",
    sourceCode: 'https://github.com/towfiq-dev/PH-Job-Tracker',
  },
];