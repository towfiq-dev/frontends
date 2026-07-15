// Centralized fetchers for data that used to come from the static files in
// src/components/allAPI/* and src/components/skillsClient/Colums.jsx.
// These are called from Server Components/layouts/pages only.
//
// `cache: "no-store"` is used deliberately (instead of ISR/revalidate) so
// that changes made from the Dashboard show up on the live site immediately,
// per the project requirement — no static/stale data anywhere.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function safeFetch(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Request to ${path} failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    // Fail soft: log and return an empty fallback so a backend hiccup
    // doesn't crash the whole page for visitors.
    console.error(`getPortfolioData: ${path} ->`, err.message);
    return fallback;
  }
}

export async function getAllProjects() {
  return safeFetch("/api/projects", []);
}

export async function getProjectCount() {
  const projects = await getAllProjects();
  return projects.length;
}

// Rebuilds the { title, subtitle, skills: [...] } column shape that
// Colums.jsx used to export statically, grouping the flat Skill list by
// category. Order of categories follows first-appearance order returned
// by the API (skills are sorted by `order` server-side already).
export async function getSkillColumns() {
  const skills = await safeFetch("/api/skills", []);
  const byCategory = new Map();

  for (const skill of skills) {
    if (!byCategory.has(skill.category)) {
      byCategory.set(skill.category, {
        title: skill.category,
        subtitle: skill.categorySubtitle || "",
        skills: [],
      });
    }
    byCategory.get(skill.category).skills.push(skill);
  }

  return Array.from(byCategory.values());
}

export async function getTechStackCount() {
  const skills = await safeFetch("/api/skills", []);
  return skills.length;
}

export async function getEducationData() {
  return safeFetch("/api/education", []);
}

export async function getCourses() {
  return safeFetch("/api/training", []);
}
