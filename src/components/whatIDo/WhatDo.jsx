import React from "react";
import { services } from '../allAPI/whatIDoAPI/WhatIDoApi';
import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";

const Services = () => {
  return (
    <section
      className="bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Services offered by Towfiqul Islam — Full Stack MERN Developer"
    >
      
        <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-900/50 bg-cyan-950/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-5">
            Services
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
            What I <span className="text-blue-500">Do</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            From concept to deployment — I deliver complete digital solutions tailored to your needs.
          </p>
        </div>
        </RevealOnScroll>
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <RevealOnScroll 
            key={index} 
            delay={index * 0.08}
            className="group relative bg-[#0a0a0b] border border-gray-800/60 p-6 rounded-3xl hover:border-gray-700 transition-all duration-300 flex flex-col"
            >
            <article>
              {/* Icon */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.bgGradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                aria-hidden="true"
              >
                {service.icon}
              </div>

              <h3 className="text-base sm:text-[17px] font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {service.description}
              </p>

              <div className="absolute inset-0 rounded-3xl bg-white/0 group-hover:bg-white/[0.015] transition-colors pointer-events-none"></div>
            </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Services;
