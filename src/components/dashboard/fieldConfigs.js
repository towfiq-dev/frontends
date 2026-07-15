// Field configs drive both the dashboard's auto-generated form and its
// table columns. Field NAMES here must match the Mongoose schema fields in
// /backend/models exactly (which in turn mirror the original static data
// files) — do not rename them.
import { SKILL_ICON_OPTIONS } from "../lib/skillIconMap";
import { EDUCATION_THEMES, COURSE_THEMES } from "../lib/colorThemes";

export const RESOURCE_CONFIG = {
  skills: {
    label: "Skills",
    resource: "skills",
    tableColumns: ["name", "category", "percentage"],
    fields: [
      { name: "name", label: "Skill Name", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "text",
        required: true,
        placeholder: "e.g. Frontend & UI/UX",
      },
      { name: "categorySubtitle", label: "Category Subtitle", type: "text" },
      {
        name: "icon",
        label: "Icon",
        type: "icon",
        required: true,
        options: SKILL_ICON_OPTIONS,
      },
      {
        name: "percentage",
        label: "Proficiency %",
        type: "text",
        required: true,
        placeholder: "e.g. 90%",
      },
      {
        name: "color",
        label: "Bar Gradient (CSS)",
        type: "text",
        required: true,
        placeholder: "linear-gradient(90deg,#1a9ed4,#61dafb)",
      },
      {
        name: "iconColor",
        label: "Icon Color (hex)",
        type: "text",
        required: true,
        placeholder: "#61DAFB",
      },
      { name: "order", label: "Display Order", type: "number" },
    ],
  },

  projects: {
    label: "Projects",
    resource: "projects",
    tableColumns: ["title", "category"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "features", label: "Features (comma separated)", type: "tags" },
      { name: "tags", label: "Tags (comma separated)", type: "tags" },
      { name: "image", label: "Image URL", type: "url", required: true },
      { name: "liveLink", label: "Live Link", type: "url" },
      { name: "sourceCode", label: "Source Code URL (single repo)", type: "url" },
      { name: "clientSourceCode", label: "Client Source Code URL", type: "url" },
      { name: "serverSourceCode", label: "Server Source Code URL", type: "url" },
      { name: "order", label: "Display Order", type: "number" },
    ],
  },

  education: {
    label: "Education",
    resource: "education",
    tableColumns: ["level", "institution", "status"],
    fields: [
      { name: "level", label: "Level", type: "text", required: true, placeholder: "e.g. SSC" },
      { name: "fullTitle", label: "Full Title", type: "text", required: true },
      { name: "institution", label: "Institution", type: "text", required: true },
      { name: "passingYear", label: "Passing Year", type: "text", required: true },
      { name: "roll", label: "Roll", type: "text" },
      { name: "regNo", label: "Registration No.", type: "text" },
      { name: "gpa", label: "GPA", type: "text" },
      { name: "outOf", label: "Out Of", type: "text", placeholder: "e.g. 5.00" },
      { name: "status", label: "Status", type: "text", required: true, placeholder: "Completed / Running" },
      { name: "icon", label: "Icon (emoji)", type: "text", required: true, placeholder: "🏫" },
      {
        name: "_educationTheme",
        label: "Quick Theme (fills the 4 color fields below with a Tailwind-safe preset)",
        type: "preset-picker",
        options: EDUCATION_THEMES,
        targetFields: ["gradient", "glowColor", "borderColor", "badgeColor"],
      },
      { name: "gradient", label: "Gradient (Tailwind classes)", type: "text", required: true },
      { name: "glowColor", label: "Glow Color (Tailwind class)", type: "text", required: true },
      { name: "borderColor", label: "Border Color (Tailwind class)", type: "text", required: true },
      { name: "badgeColor", label: "Badge Color (Tailwind class)", type: "text", required: true },
      { name: "highlight", label: "Highlight Text", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "board", label: "Board", type: "text" },
      { name: "boardLogo", label: "Board Logo URL", type: "url" },
      { name: "institutionLogo", label: "Institution Logo URL", type: "url" },
      { name: "certificateImage", label: "Certificate Image URL", type: "url" },
      { name: "order", label: "Display Order", type: "number" },
    ],
  },

  training: {
    label: "Training",
    resource: "training",
    tableColumns: ["title", "institution", "issuedDate"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "institution", label: "Institution", type: "text", required: true },
      { name: "instructor", label: "Instructor", type: "text" },
      { name: "issuedDate", label: "Issued Date", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "badge", label: "Badge", type: "text" },
      { name: "tags", label: "Tags (comma separated)", type: "tags" },
      { name: "description", label: "Description", type: "textarea", required: true },
      {
        name: "projects",
        label: "Related Projects",
        type: "list",
        itemFields: [
          { name: "name", label: "Project Name", type: "text" },
          { name: "link", label: "Link", type: "url" },
        ],
      },
      {
        name: "_courseTheme",
        label: "Quick Theme (fills Color + Gradient below with a Tailwind-safe preset)",
        type: "preset-picker",
        options: COURSE_THEMES,
        targetFields: ["color", "gradient"],
      },
      { name: "color", label: "Accent Color (hex)", type: "text", required: true, placeholder: "#10b981" },
      { name: "gradient", label: "Gradient (Tailwind classes)", type: "text", required: true },
      { name: "icon", label: "Icon (emoji)", type: "text", placeholder: "💻" },
      { name: "institutionLogo", label: "Institution Logo URL", type: "url", required: true },
      { name: "certificateImage", label: "Certificate Image URL", type: "url" },
      { name: "order", label: "Display Order", type: "number" },
    ],
  },
};
