import React, { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import ProLnkLogo from "@/components/ProLnkLogo";

/**
 * /admin-login — dedicated admin sign-in page.
 *
 * Uses the same partnerAuth.login mutation (which now checks users.adminPasswordHash
 * for admin role) but is a separate route + UI from /partner-login so admins
 * have an unambiguous entry point.
 */
export default function AdminLogin() {
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.partnerAuth.login.useMutation({
    onSuccess: async (data: any) => {
      const isAdmin = data?.partner?.tier === "admin";
      if (!isAdmin) {
        setError("This sign-in is for admins only. Partners, use /partner-login.");
        return;
      }
      // Refresh the cached auth.me (still null from before login) so /admin
      // recognizes the new session instead of bouncing to the sign-in screen.
      await utils.auth.me.invalidate();
      navigate("/admin");
    },
    onError: (e) => setError(e.message || "Invalid email or password."),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0d1f3c 50%, #0A1628 100%)" }}>
      {/* Header */}
      <header className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/">
            <div className="bg-white rounded-xl px-3 py-1.5 inline-block">
              <ProLnkLogo height={36} />
            </div>
          </a>
          <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Admin Portal</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-gray-900 mb-2">Admin Sign In</h1>
              <p className="text-gray-500 text-sm">Restricted access — admin accounts only.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#0A1628]/30 focus:border-[#0A1628]"
                  placeholder="andrew@lit-ventures.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#0A1628]/30 focus:border-[#0A1628]"
                  placeholder="••••••••••••••••"
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-3.5 rounded-xl bg-[#0A1628] hover:bg-[#1E293B] text-white font-bold text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? "Signing in…" : "Sign In to Admin"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Not an admin?{" "}
                <a href="/partner-login" className="text-[#0A1628] font-semibold hover:underline">
                  Partner sign in →
                </a>
              </p>
            </div>
          </div>

          <p className="text-center text-white/30 text-xs mt-6">
            ProLnk Admin Portal · DFW, Texas
          </p>
        </div>
      </main>
    </div>
  );
}
