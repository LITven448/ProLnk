/**
 * Login Page — Email/Password + Google OAuth
 * Route: /login
 * Replaces Manus OAuth redirect.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProLnkLogo } from "@/components/ProLnkLogo";
import { useBrand } from "@/lib/brand";
import { Home, Mail, Lock, Eye, EyeOff, Chrome } from "lucide-react";

export default function Login() {
  const [, navigate] = useLocation();
  const brand = useBrand();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const returnPath = new URLSearchParams(window.location.search).get("returnPath") ?? brand.defaultLoginRedirect;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed"); return; }
      // Reload to let tRPC context pick up the new session
      window.location.href = returnPath;
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `/api/auth/google?returnPath=${encodeURIComponent(returnPath)}`;
  };

  const isTrustyPro = brand.name === "trustypro";

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isTrustyPro ? "bg-gray-50" : "bg-gray-950"}`}>
      <div className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ${isTrustyPro ? "bg-white border border-gray-100" : "bg-gray-900 border border-gray-800"}`}>
        {/* Header */}
        <div className={`p-8 text-center ${isTrustyPro ? "bg-indigo-600" : "bg-gray-800"}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            {isTrustyPro
              ? <Home className="w-8 h-8 text-white" />
              : <ProLnkLogo height={32} />
            }
            <span className="font-black text-white text-2xl">{brand.displayName}</span>
          </div>
          <p className="text-white/70 text-sm">{brand.tagline}</p>
        </div>

        <div className="p-8">
          <h2 className={`text-xl font-bold mb-6 ${isTrustyPro ? "text-gray-900" : "text-white"}`}>Sign in to your account</h2>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border font-semibold text-sm transition-colors mb-6 ${
              isTrustyPro
                ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                : "border-gray-700 text-gray-300 hover:bg-gray-800"
            }`}
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className={`flex-1 h-px ${isTrustyPro ? "bg-gray-200" : "bg-gray-800"}`} />
            <span className={`text-xs ${isTrustyPro ? "text-gray-400" : "text-gray-600"}`}>or sign in with email</span>
            <div className={`flex-1 h-px ${isTrustyPro ? "bg-gray-200" : "bg-gray-800"}`} />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className={`absolute left-3 top-3 w-4 h-4 ${isTrustyPro ? "text-gray-400" : "text-gray-600"}`} />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={`pl-10 ${isTrustyPro ? "" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-600"}`}
              />
            </div>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 w-4 h-4 ${isTrustyPro ? "text-gray-400" : "text-gray-600"}`} />
              <Input
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={`pl-10 pr-10 ${isTrustyPro ? "" : "bg-gray-800 border-gray-700 text-white placeholder:text-gray-600"}`}
              />
              <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-3 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading} className={`w-full font-bold h-11 ${isTrustyPro ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-teal-500 hover:bg-teal-400 text-white"}`}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center justify-between mt-6 text-sm">
            <a href="/forgot-password" className={`hover:underline ${isTrustyPro ? "text-indigo-600" : "text-teal-400"}`}>
              Forgot password?
            </a>
            <button onClick={() => navigate("/register")} className={`hover:underline ${isTrustyPro ? "text-gray-600" : "text-gray-400"}`}>
              Create account →
            </button>
          </div>

          {!isTrustyPro && (
            <p className="text-center text-gray-600 text-xs mt-6">
              Service professional?{" "}
              <button onClick={() => navigate("/apply")} className="text-teal-400 hover:underline">Apply to join ProLnk</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
