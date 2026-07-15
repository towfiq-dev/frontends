import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";

// AnimatedBar — renders the progress bar track + animated fill
const AnimatedBar = ({ percentage, color, inView }) => {
  const numVal = parseInt(percentage);

  return (
    <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: inView ? `${numVal}%` : "0%",
          background: color,
          boxShadow: `0 0 8px ${color}55`,
          transitionDelay: "0.15s",
        }}
      />
    </div>
  );
};

// SkillRow — single skill item with icon, name, percentage, and animated bar
const SkillRow = ({ name, icon, percentage, color, iconColor, inView }) => (
  <RevealOnScroll>
  <div className="group relative flex flex-col gap-2.5 bg-[#0c0f0f] border border-white/[0.06] rounded-xl px-4 py-3.5 hover:border-white/[0.14] hover:bg-[#111515] transition-all duration-300 cursor-default">
    <div className="flex items-center gap-3">
      <span
        className="text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ color: iconColor }}
      >
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium text-gray-200 tracking-wide group-hover:text-white transition-colors duration-200">
        {name}
      </span>
      <span className="text-xs font-mono text-gray-500 group-hover:text-gray-300 transition-colors duration-200 tabular-nums">
        {percentage}
      </span>
    </div>
    <AnimatedBar percentage={percentage} color={color} inView={inView} />
  </div>
  </RevealOnScroll>
);

// CategoryColumn — a titled group of skill rows
export const CategoryColumn = ({ title, subtitle, skills, inView }) => (
  <RevealOnScroll>
  <div className="flex flex-col gap-3">
    <p className="text-[14px] font-semibold tracking-[0.2em] uppercase text-cyan-500/70 mb-1 px-1">
      {title}
    </p>
    {subtitle && (
      <p className="text-[12px] text-gray-500 px-1 -mt-1 mb-1">{subtitle}</p>
    )}
    {skills.map((skill, i) => (
      <SkillRow key={i} {...skill} inView={inView} />
    ))}
  </div>
  </RevealOnScroll>
);