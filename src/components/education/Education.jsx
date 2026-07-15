import { Calendar, Star, TrendingUp } from "lucide-react";
import GPABar from "./GPABar";
import EducationInteractive from "./EducationInteractive";
import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";

// Static education cards — server rendered for SEO
const EducationCard = ({ edu, index }) => {
  const isRight = index % 2 === 0;
  return (
    <article
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"
        }`}
    >
      
      {/* Card */}
      <div className={`w-full md:w-[46%] ${isRight ? "md:pr-10" : "md:pl-10"}`}>
        <RevealOnScroll>
        <div
          className={`group relative bg-[#0a0a0a] border ${edu.borderColor} rounded-3xl p-6 sm:p-8 hover:shadow-2xl ${edu.glowColor} transition-all duration-500 overflow-hidden`}
        >
          <div
            className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${edu.gradient} opacity-0 group-hover:opacity-[0.06] rounded-full blur-3xl transition-opacity duration-500 pointer-events-none`}
          ></div>

          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${edu.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
              >
                {edu.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-none mb-1">
                  {edu.level}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium leading-none">{edu.fullTitle}</p>
              </div>
            </div>
            <span
              className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${edu.badgeColor}`}
            >
              {edu.status}
            </span>
          </div>

          {/* Description — crawlable by Google */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{edu.description}</p>

          {/* GPA & Year */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Star size={14} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block">GPA</span>
                <span className="text-white font-bold text-base leading-none">
                  {edu.gpa !== "Running" ? `${edu.gpa} / ${edu.outOf}` : "In Progress"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-500 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Year</span>
                <span className="text-white font-bold text-base leading-none">{edu.passingYear}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp
                size={14}
                className={`flex-shrink-0 text-transparent bg-gradient-to-br ${edu.gradient} [background-clip:text]`}
              />
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Track</span>
                <span className="text-white font-bold text-sm leading-none">{edu.highlight}</span>
              </div>
            </div>
          </div>

          {/* GPA Bar — client component for animation */}
          <GPABar gpa={edu.gpa} gradient={edu.gradient} />
          <div className="flex justify-between mt-1.5 mb-5">
            <span className="text-[10px] text-gray-600">0.00</span>
            <span className="text-[10px] text-gray-600">5.00</span>
          </div>

          {/* Interactive button handled by client wrapper */}
          <EducationInteractive edu={edu} />
        </div>
        </RevealOnScroll>
      </div>
      
      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
        <div
          className={`w-5 h-5 rounded-full bg-gradient-to-br ${edu.gradient} ring-4 ring-black shadow-lg`}
        />
      </div>

      {/* Year label */}
      <div
        className={`hidden md:flex w-[46%] ${isRight ? "md:pl-10" : "md:pr-10"
          } items-center ${isRight ? "justify-start" : "justify-end"}`}
      >
        <div className="text-center">
          <span
            className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent opacity-20`}
          >
            {edu.passingYear?.split(" ")[0]}
          </span>
        </div>
      </div>
      
    </article>
  );
};

const EducationPage = ({ data = [] }) => {
  return (
    <section className="bg-black text-white">
      {/* Header */}
      <div className="relative text-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-[80px] pointer-events-none"></div>
        <RevealOnScroll>
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-5">
            Academic Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            A structured academic path building the knowledge and skills that power my work as a developer.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>
        </RevealOnScroll>
      </div>

      {/* Timeline */}
      <div className="max-w-305 mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent -translate-x-1/2"></div>
          <div className="space-y-10 md:space-y-16">
            {data.map((edu, index) => (
              <EducationCard key={edu._id} edu={edu} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-10 sm:mt-16 md:mt-20 grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4">
          {[
            { label: "Exams Passed", value: "2", color: "text-cyan-400" },
            { label: "Avg. GPA", value: "4.19", color: "text-purple-400" },
            { label: "Currently", value: "3rd Year", color: "text-emerald-400" },
          ].map((item, i) => (
            <RevealOnScroll key={i}>
            <div
              className="bg-[#0a0a0a] border border-gray-900 rounded-lg sm:rounded-2xl p-2 sm:p-5 md:p-6 text-center hover:border-gray-800 transition-all"
            >
              <p className={`text-base sm:text-2xl md:text-3xl font-black mb-0.5 sm:mb-1 leading-tight ${item.color}`}>
                {item.value}
              </p>
              <p className="text-gray-500 text-[8px] sm:text-[11px] md:text-xs uppercase tracking-wide sm:tracking-widest font-medium leading-tight">
                {item.label}
              </p>
            </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationPage;
