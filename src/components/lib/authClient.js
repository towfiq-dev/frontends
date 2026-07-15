"use client";

import { createAuthClient } from "better-auth/react";

// Points at the separate backend project (see /backend), not this Next.js app.
// credentials: "include" is required since the backend is a different
// origin — without it, the browser won't send/store the session cookie.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    credentials: "include",
  },
});

export const { useSession, signIn, signOut } = authClient;
