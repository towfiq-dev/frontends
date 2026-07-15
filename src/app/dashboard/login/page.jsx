"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/components/lib/authClient";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: authError } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (authError) {
      setError(authError.message || "Login failed. Check your email and password.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      // Must be absolute: the final OAuth redirect is issued from the
      // backend's own domain, so a relative "/dashboard" would resolve
      // there instead of back to this frontend.
      callbackURL: `${window.location.origin}/dashboard`,
    });
  };

  return (
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#0c0f0f] border border-white/10 rounded-2xl p-8">
        <h1 className="text-xl font-bold text-white mb-1">Dashboard Login</h1>
        <p className="text-sm text-gray-500 mb-6">Manage your portfolio content.</p>

        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500/60"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500/60"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs text-gray-600">or</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2.5 rounded-lg border border-white/10 text-sm font-medium text-gray-200 hover:bg-white/5"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
