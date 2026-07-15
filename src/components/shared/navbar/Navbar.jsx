// Server Component — no "use client" needed
import Link from "next/link";
import Image from "next/image";
import { Download, Home, User, Code2, Briefcase, Mail, Zap } from "lucide-react";
import { MdCastForEducation, MdModelTraining } from "react-icons/md";
import Logo from "@/assets/logo-images/logo1.svg";
import NavActiveLink from "./NavActiveLink";
import MobileMenu from "./MobileMenu";
import NavScrollWrapper from "./NavScrollWrapper";
import ThemeToggle from "./ThemeToggle";
import ResumeButton from "../resumeModal/ResumeButton";

const navLinks = [
  { name: "Home",      href: "/",                  icon: <Home size={15} /> },
  { name: "About",     href: "/navLinks/about",     icon: <User size={15} /> },
  { name: "Skills",    href: "/navLinks/skills",    icon: <Code2 size={15} /> },
  { name: "Projects",  href: "/navLinks/projects",  icon: <Briefcase size={15} /> },
  { name: "Education", href: "/navLinks/education", icon: <MdCastForEducation size={15} /> },
  { name: "Training",  href: "/navLinks/training",  icon: <MdModelTraining size={15} /> },
  { name: "Contact",   href: "/navLinks/contact",   icon: <Mail size={15} /> },
];

const Navbar = () => {
  return (
    <NavScrollWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" aria-label="Towfiqul Islam — Portfolio Home">
            <Image
              width={140}
              height={40}
              alt="Towfiqul Islam — MERN Stack Developer"
              src={Logo}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavActiveLink key={link.name} href={link.href} icon={link.icon} name={link.name} />
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <ResumeButton
              aria-label="Open resume — select a role"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-gray-300 cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all text-sm font-medium"
            >
              <Download size={14} aria-hidden="true" />
              <span>Resume</span>
            </ResumeButton>
            <Link
              href="/navLinks/contact"
              aria-label="Hire Towfiqul Islam — Contact"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all active:scale-95"
            >
              <Zap size={14} fill="white" aria-hidden="true" />
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu — client component */}
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </NavScrollWrapper>
  );
};

export default Navbar;
