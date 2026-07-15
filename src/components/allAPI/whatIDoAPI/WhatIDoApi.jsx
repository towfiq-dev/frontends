import { Globe, Smartphone, Database, MessageSquare, Zap, ShieldCheck } from "lucide-react";

export const services = [
  {
    title: "Full Stack Web Development",
    description:
      "End-to-end web applications built with modern frameworks, clean architecture, and scalable backends.",
    icon: <Globe className="w-6 h-6 text-white" />,
    bgGradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Responsive UI / UX",
    description:
      "Pixel-perfect, mobile-first interfaces with smooth animations and intuitive user experiences.",
    icon: <Smartphone className="w-6 h-6 text-white" />,
    bgGradient: "from-purple-500 to-pink-500",
  },
  {
    title: "API & Database Design",
    description:
      "Architecting scalable MongoDB schemas and integrating BetterAuth for secure, multi-provider authentication and robust data integrity.",
    icon: <Database className="w-6 h-6 text-white" />,
    bgGradient: "from-emerald-500 to-teal-400",
  },
  {
    title: "Authentication & Security",
    description:
      "Implementing robust security layers using BetterAuth, Firebase, or JWT to protect user data and ensure privacy.",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    bgGradient: "from-indigo-600 to-violet-500",
  },
  {
    title: "Performance Optimization",
    description:
      "Speeding up web applications through code splitting, image optimization, and efficient caching strategies.",
    icon: <Zap className="w-6 h-6 text-white" />,
    bgGradient: "from-yellow-500 to-orange-400",
  },
  {
    title: "Real-time Applications",
    description:
      "Building dynamic, live-updating features like chat systems or notifications using WebSockets and real-time databases.",
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    bgGradient: "from-green-500 to-emerald-400",
  }
];