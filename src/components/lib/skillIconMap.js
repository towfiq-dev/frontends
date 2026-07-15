// Maps the icon KEY string stored in the database (e.g. "SiReact") back to
// the real icon component. Real React components can't be stored in
// MongoDB, so the dashboard's Skill form only ever lets you pick from this
// fixed list — this is the single source of truth for both the picker (in
// the dashboard) and the render step (on the live Skills page).
import { FaCss3Alt, FaPython } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFirebase,
  SiPrisma,
  SiVercel,
  SiFigma,
  SiTypescript,
  SiFramework,
} from "react-icons/si";

export const SKILL_ICON_MAP = {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFirebase,
  SiPrisma,
  SiVercel,
  SiFigma,
  SiTypescript,
  SiFramework,
  FaCss3Alt,
  FaPython,
};

// Friendly labels for the dashboard's icon picker grid.
export const SKILL_ICON_OPTIONS = Object.keys(SKILL_ICON_MAP).map((key) => ({
  key,
  label: key.replace(/^Si|^Fa/, ""),
}));
