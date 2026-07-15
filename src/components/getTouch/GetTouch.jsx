import React from "react";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";

const email = "towfiqulislam017399@gmail.com";

const ContactSection = () => {
  return (
    <section
      className="bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      aria-label="Contact Towfiqul Islam — Get In Touch"
    >
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
        <div className="relative group bg-[#0d0d12] border border-gray-800/60 rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl overflow-hidden">

          {/* Glow effects */}
          <div className="absolute inset-0 rounded-3xl border border-cyan-500/10 group-hover:border-cyan-500/30 transition-colors duration-300 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Mail Icon */}
          <div className="mb-8 inline-flex items-center justify-center relative z-10" aria-hidden="true">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight relative z-10">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-10 relative z-10">
            Have a project in mind or want to collaborate? I&apos;m always open to discussing new
            opportunities and ideas. Contact <strong className="text-gray-300">Towfiqul Islam</strong> today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/navLinks/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-white rounded-full font-semibold text-base shadow-lg hover:from-cyan-500 hover:to-purple-700 hover:-translate-y-1 transition-all duration-300"
              aria-label="Contact Towfiqul Islam"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>

            <a
              href={`mailto:${email}`}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 bg-[#14141a] border border-gray-700/50 text-gray-300 rounded-full font-mono text-sm hover:bg-[#18181f] hover:border-gray-600 hover:-translate-y-1 transition-all duration-300 break-all sm:break-normal"
              aria-label={`Send email to Towfiqul Islam at ${email}`}
            >
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{email}</span>
            </a>
          </div>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ContactSection;
