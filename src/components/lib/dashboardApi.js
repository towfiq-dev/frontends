"use client";

// Thin REST client used only inside the Dashboard (browser side). Sends the
// Better Auth session cookie with every request so the backend's
// requireAuth middleware can verify it.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// resource: "skills" | "projects" | "education" | "training"
export const dashboardApi = {
  list: (resource) => request(`/api/${resource}`),
  create: (resource, data) =>
    request(`/api/${resource}`, { method: "POST", body: JSON.stringify(data) }),
  update: (resource, id, data) =>
    request(`/api/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (resource, id) => request(`/api/${resource}/${id}`, { method: "DELETE" }),
};
