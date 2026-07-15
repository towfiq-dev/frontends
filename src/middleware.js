import { NextResponse } from "next/server";

// Known search-engine crawler user-agents. Add more here if a bot you care
// about (that should see the raw portfolio, not the gate) isn't matching.
const BOT_UA_PATTERNS = [
  /Googlebot/i,
  /Google-InspectionTool/i,
  /Bingbot/i,
  /Slurp/i, // Yahoo
  /DuckDuckBot/i,
  /Baiduspider/i,
  /YandexBot/i,
  /Sogou/i,
  /Exabot/i,
  /facebookexternalhit/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /Applebot/i,
  /PetalBot/i,
];

// Runs on every page request before it reaches the app. Flags known bot
// traffic via a request header so the layout (server component) can skip
// rendering the reCAPTCHA gate for them — the gate is a UX/anti-spam
// checkpoint for humans, not something search engines should see.
//
// NOTE on /dashboard protection: it is intentionally NOT gated here. The
// backend (a separate Vercel project/domain) issues the Better Auth
// session cookie, which the browser scopes to the BACKEND's origin — it
// is never sent with requests to THIS frontend domain, so this edge
// middleware can never actually see it. Checking for it here would always
// read as "logged out" and create a redirect loop even immediately after
// a successful login. The real protection is: (1) the client-side
// useSession() check in src/app/dashboard/layout.jsx, which talks to the
// backend directly over `credentials: "include"` and therefore does see
// the cookie, and (2) the backend's requireAuth middleware, which rejects
// every unauthenticated Create/Update/Delete request regardless of what
// the frontend shows. That pairing is the actual security boundary.
export function middleware(request) {
  const userAgent = request.headers.get("user-agent") || "";
  const isBot = BOT_UA_PATTERNS.some((pattern) => pattern.test(userAgent));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-is-bot", isBot ? "1" : "0");

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

// Skip the middleware for static assets, the API routes, and files that
// already have an extension (images, robots.txt, sitemap.xml, etc.) —
// those should always be reachable directly.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
