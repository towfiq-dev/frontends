import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import {
  FACEBOOK_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  WHATSAPP_URL,
} from "../../lib/constants";

const SOCIALS = [
  { id: 1, icon: FaGithub, url: GITHUB_URL, label: "Towfiqul Islam on GitHub" },
  { id: 2, icon: FaLinkedinIn, url: LINKEDIN_URL, label: "Towfiqul Islam on LinkedIn" },
  { id: 3, icon: FaXTwitter, url: TWITTER_URL, label: "Towfiqul Islam on Twitter / X" },
  { id: 4, icon: FaFacebookF, url: FACEBOOK_URL, label: "Towfiqul Islam on Facebook" },
  { id: 5, icon: FaSquareWhatsapp, url: WHATSAPP_URL, label: "Contact Towfiqul Islam on WhatsApp" },
];


const SIZES = {
  sm: {
    box: "w-9 h-9 sm:w-10 sm:h-10 rounded-lg",
    icon: "text-sm sm:text-base",
  },
  md: {
    box: "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl",
    icon: "text-base sm:text-lg",
  },
  lg: {
    box: "w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl",
    icon: "text-lg sm:text-xl",
  }
};

const SocialLinks = ({ className = "", size = "md", gap = "gap-2 sm:gap-3" }) => {
  const { box, icon } = SIZES[size] ?? SIZES.md;

  return (
    <nav
      className={`flex flex-nowrap items-center ${gap} ${className}`}
      aria-label="Towfiqul Islam social media links"
    >
      {SOCIALS.map(({ id, icon: Icon, url, label }) => (
        <Link
          key={id}
          href={url}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label={label}
          title={label}
          className={`relative group flex items-center justify-center shrink-0 ${box}
                    bg-white/5 border border-white/10 text-gray-400
                    transition-all duration-300 ease-in-out
                    hover:bg-white/10 hover:border-white/20 hover:text-white hover:-translate-y-1
                    backdrop-blur-md shadow-lg overflow-hidden`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className={`relative z-10 ${icon}`} aria-hidden="true">
            <Icon />
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default SocialLinks;