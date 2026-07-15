import { NextResponse } from "next/server";

const VERIFY_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";

// v3 returns a risk score (0.0 = likely bot, 1.0 = likely human) instead of
// a simple pass/fail. 0.5 is Google's own suggested default threshold.
const SCORE_THRESHOLD = 0.5;

// Verifies the token the client got from Google's reCAPTCHA widget by
// checking it against Google's server — this is the step that makes the
// protection real (a forged/empty token can never pass this check since
// only Google knows whether a given token is genuine).
export async function POST(request) {
  let token;
  try {
    ({ token } = await request.json());
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { success: false, error: "reCAPTCHA is not configured on the server" },
      { status: 500 }
    );
  }

  const verifyRes = await fetch(VERIFY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = await verifyRes.json();

  // For v3: result.success only confirms the token itself is genuine.
  // The actual bot/human decision comes from result.score.
  if (!result.success || (result.score ?? 0) < SCORE_THRESHOLD) {
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 400 });
  }

  // No cookie is set on purpose: every fresh visit (or reload) should run
  // its own verification rather than being remembered across sessions.
  return NextResponse.json({ success: true });
}
