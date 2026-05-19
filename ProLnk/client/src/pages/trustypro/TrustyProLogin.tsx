import { useEffect, type FormEvent } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { Shield, Star, CheckCircle, ArrowRight, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const BRAND = "#0d9488";
const BRAND_LIGHT = "rgba(13,148,136,0.15)";
const BRAND_BORDER = "rgba(13,148,136,0.4)";
const NAVY = "#0a0f1e";
const CARD_BG = "#0e1628";
const INPUT_BG = "rgba(255,255,255,0.06)";
const INPUT_BORDER = "rgba(255,255,255,0.12)";
const INPUT_FOCUS_BORDER = BRAND;

const TRUST_INDICATORS = [
  { icon: Shield, text: "Background-checked pros" },
  { icon: CheckCircle, text: "AI-matched, verified by TrustyPro" },
  { icon: Star, text: "Rated & reviewed network" },
];

export default function TrustyProLogin() {
  const [, navigate] = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/my-home");
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;

    if (!oauthPortalUrl) {
      navigate("/my-home");
      return;
    }

    const appId = import.meta.env.VITE_APP_ID;
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const statePayload = JSON.stringify({ redirectUri, returnPath: "/my-home", source: "trustypro" });
    const state = btoa(statePayload);
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    window.location.href = url.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: BRAND, borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: NAVY }}>
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,148,136,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <TrustyProLogo variant="dark" height={40} />
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: CARD_BG,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-white">Log in to TrustyPro</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              Access your home profile and pro network
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email address</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
                style={{
                  background: INPUT_BG,
                  border: `1px solid ${focusedField === "email" ? INPUT_FOCUS_BORDER : INPUT_BORDER}`,
                  boxShadow: focusedField === "email" ? `0 0 0 3px rgba(13,148,136,0.15)` : "none",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-400">Password</label>
                <button
                  type="button"
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: BRAND }}
                  onClick={() => navigate("/trustypro/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
                  style={{
                    background: INPUT_BG,
                    border: `1px solid ${focusedField === "password" ? INPUT_FOCUS_BORDER : INPUT_BORDER}`,
                    boxShadow: focusedField === "password" ? `0 0 0 3px rgba(13,148,136,0.15)` : "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 mt-2"
              style={{ background: BRAND }}
            >
              Log in to TrustyPro
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Google OAuth */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs" style={{ background: CARD_BG, color: "rgba(255,255,255,0.3)" }}>or continue with</span>
            </div>
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
            onClick={() => {}}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs" style={{ background: CARD_BG, color: "rgba(255,255,255,0.3)" }}>
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign up CTA — Founding Partner */}
          <Link
            href="/founding-partner"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{
              background: BRAND_LIGHT,
              border: `1px solid ${BRAND_BORDER}`,
              color: "#5eead4",
            }}
          >
            Join as Founding Partner
            <ArrowRight size={14} />
          </Link>

          {/* Trust indicators */}
          <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex flex-col gap-2">
              {TRUST_INDICATORS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: BRAND_LIGHT, border: `1px solid ${BRAND_BORDER}` }}
                  >
                    <Icon size={12} style={{ color: BRAND }} />
                  </div>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-between mt-6 text-xs px-1">
          <button
            onClick={() => navigate("/trustypro")}
            className="transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            ← Back to TrustyPro
          </button>
          <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            <Lock size={10} />
            <span>Secure login</span>
          </div>
        </div>

        {/* Pro partner link */}
        <p className="text-center mt-4 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Are you a home service pro?{" "}
          <button
            onClick={() => navigate("/trustypro/partner-dashboard")}
            className="font-semibold hover:underline"
            style={{ color: "rgba(13,148,136,0.9)" }}
          >
            Partner Dashboard →
          </button>
        </p>
      </motion.div>
    </div>
  );
}
