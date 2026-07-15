"use client";

import { useEffect, useRef, useState } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
const SCRIPT_ID = "recaptcha-script";

/**
 * Invisible "security check" gate shown to human visitors before the
 * portfolio loads. Uses Google's real reCAPTCHA v3 (score-based, no
 * checkbox/image challenge). The token it produces is verified
 * server-side in /api/verify-recaptcha.
 *
 * Runs on every visit on purpose — nothing is remembered between visits,
 * so a reload or a fresh visit always re-verifies. Once verified, this
 * component simply renders {children} (the real site) in place.
 *
 * Never rendered for known search-engine bots — see middleware.js and
 * layout.jsx, which decide that before this even mounts.
 */
export default function RecaptchaGate({ children }) {
  const executedRef = useRef(false);

  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState("verifying"); // verifying | verified | error

  const verifyToken = async (token) => {
    try {
      const res = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      setStatus(data.success ? "verified" : "error");
    } catch {
      setStatus("error");
    }
  };

  const runCheck = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(SITE_KEY, { action: "homepage" })
        .then(verifyToken)
        .catch(() => setStatus("error"));
    });
  };

  // Loads Google's official reCAPTCHA v3 script once (skips if already present)
  useEffect(() => {
    if (!SITE_KEY) return;

    if (window.grecaptcha?.execute) {
      setScriptReady(true);
      return;
    }

    window.__onRecaptchaScriptLoad = () => setScriptReady(true);

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}&onload=__onRecaptchaScriptLoad`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Silently gets a token the moment the script is ready — no click needed
  useEffect(() => {
    if (!scriptReady || executedRef.current) return;
    if (!window.grecaptcha?.execute) return;

    executedRef.current = true;
    runCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptReady]);

  const retry = () => {
    setStatus("verifying");
    if (window.grecaptcha?.execute) {
      runCheck();
    } else {
      executedRef.current = false;
      setScriptReady(false);
      setScriptReady(true);
    }
  };

  if (status === "verified") {
    return children;
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black px-4">
      {status === "verifying" && (
        <div className="flex flex-col items-center gap-5">
          {/* Layered spinner: outer ring track + spinning gradient arc */}
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-4 border-white/10" />
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin"
              style={{ animationDuration: "0.9s" }}
            />
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="text-white text-base sm:text-lg font-medium">
              Verifying you&apos;re human
            </p>
            <p className="text-slate-400 text-sm max-w-xs">
              Running a quick, invisible security check before loading the site…
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-white text-base font-medium">
            We couldn&apos;t verify your visit
          </p>
          <p className="text-slate-400 text-sm max-w-xs">
            Something went wrong during the security check. Please try again.
          </p>
          <button
            onClick={retry}
            className="text-sm px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-medium hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      )}

      {!SITE_KEY && (
        <p className="mt-4 text-sm text-red-400">
          reCAPTCHA site key is missing — set NEXT_PUBLIC_RECAPTCHA_KEY in your environment.
        </p>
      )}
    </main>
  );
}
