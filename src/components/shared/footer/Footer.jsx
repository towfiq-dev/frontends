import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "@/assets/logo-images/logo1.svg";
import { ADDRESS, EMAIL, PHONE } from "@/components/lib/constants";
import SocialLinks from "@/components/shared/socialLinks/SocialLinks";

const Footer = () => {
  return (
    <footer
      className="bg-[#020617] text-slate-400 pt-14 pb-8 border-t border-slate-800/50"
      aria-label="Footer — Towfiqul Islam Portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid: branding column gets less space (4/12), links wrapper gets more (8/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

          {/* Column 1: Branding */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" aria-label="Towfiqul Islam — Home" className="flex items-center gap-2.5">
              <Image
                width={140}
                height={40}
                alt="Towfiqul Islam (তৌফিকুল ইসলাম) — MERN Stack Developer Logo"
                src={Logo}
              />
            </Link>
            {/* max-w-xs keeps this text width aligned with the logo above */}
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              <strong className="text-slate-300">Towfiqul Islam</strong> — Full Stack MERN Developer from Dhaka, Bangladesh.
              Crafting modern, performant web applications with clean code and pixel-perfect design.
            </p>
            {/* Hidden SEO text with Bengali name */}
            <span className="sr-only">তৌফিকুল ইসলাম — বাংলাদেশের ঢাকার একজন ফুল স্ট্যাক ওয়েব ডেভেলপার</span>

            <SocialLinks />
          </div>

          {/* Links wrapper: column gaps tuned so the email address doesn't wrap */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 md:gap-8 lg:pl-12">

            {/* Column 2: Quick Links */}
            <nav aria-label="Quick navigation links">
              <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/navLinks/about" },
                  { label: "Skills", href: "/navLinks/skills" },
                  { label: "Projects", href: "/navLinks/projects" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-sky-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 3: More */}
            <nav aria-label="More navigation links">
              <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">
                More
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Education", href: "/navLinks/education" },
                  { label: "Jobs", href: "/navLinks/contact" },
                  { label: "Training", href: "/navLinks/training" },
                  { label: "Contact", href: "/navLinks/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-sky-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 4: Contact Info — whitespace-nowrap keeps the email on one line */}
            <address aria-label="Contact information" className="not-italic">
              <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">
                Get In Touch
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 whitespace-nowrap">
                  <FaEnvelope className="text-sky-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <a href="mailto:towfiqulislam017399@gmail.com" className="hover:text-sky-400 transition-colors">
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-3 whitespace-nowrap">
                  <FaPhoneAlt className="text-sky-500 flex-shrink-0" aria-hidden="true" />
                  <a href="tel:+8801739943577" className="hover:text-sky-400 transition-colors">{PHONE}</a>
                </li>
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-sky-500 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {ADDRESS}
                  </a>
                </li>
              </ul>
            </address>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm">
          <p>
            © {new Date().getFullYear()} Towfiqul Islam. All rights reserved.
            <span className="sr-only"> তৌফিকুল ইসলাম</span>
          </p>

          <p>
            Designed & Built by{" "}
            <span className="text-sky-500">Towfiqul Islam</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;