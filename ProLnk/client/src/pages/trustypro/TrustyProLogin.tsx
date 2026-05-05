import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { Shield, Camera, Star, CheckCircle, ArrowRight, Home } from "lucide-react";
import { motion } from "framer-motion";

const ACCENT = "#4F46E5";
const CDN_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-hero-interior_21ad489c.webp";

const BENEFITS = [
  { icon: Camera,       text: "AI scans your home photos for maintenance needs" },
  { icon: Shield,       text: "Matched with verified, background-checked pros" },
  { icon: Star,         text: "Before & after mockups for every project" },
  { icon: CheckCircle,  text: "Track jobs, invoices, and warranties in one place" },
];

export default function TrustyProLogin() {
  const [, navigate] = useLocation();
  const { isAuthenticated, loading } = useAuth();

  // If already logged in, redirect to the homeowner dashboard
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/my-home");
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogin = () => {
    const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;

    // OAuth is optional — if not configured, navigate to home
    if (!oauthPortalUrl) {
      navigate("/my-home");
      return;
    }

    // Encode return path so after OAuth the user lands on /my-home
    const appId = import.meta.env.VITE_APP_ID;
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    // We embed a custom state that tells the callback this is a homeowner login
    const statePayload = JSON.stringify({ redirectUri, returnPath: "/my-home", source: "trustypro" });
    const state = btoa(statePayload);
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    window.location.href = url.toString();
  };

  const handleSignUp = () => {
    const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;

    // OAuth is optional — if not configured, navigate to home
    if (!oauthPortalUrl) {
      navigate("/my-home/wizard");
      return;
    }

    const appId = import.meta.env.VITE_APP_ID;
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const statePayload = JSON.stringify({ redirectUri, returnPath: "/my-home/wizard", source: "trustypro" });
    const state = btoa(statePayload);
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signUp");
    window.location.href = url.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Left: Branded Panel ──────────────────────────────── */}
      <div className="relative hidden md:flex md:w-1/2 flex-col justify-between p-10 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={CDN_BG} alt="Home" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/85 via-indigo-800/75 to-purple-900/80" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <TrustyProLogo variant="dark" height={44} />
        </div>

        {/* Benefits list */}
        <div className="relative z-10 space-y-5">
          <h2 className="text-3xl font-black text-white leading-tight">
            Your home.<br />Smarter than ever.
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed">
            TrustyPro uses AI to scan your home photos, identify what needs attention, and connect you with verified local professionals — all in one place.
          </p>
          <div className="space-y-3 pt-2">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-indigo-100">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs text-indigo-300">
            Serving DFW homeowners · Powered by ProLnk Network
          </p>
        </div>
      </div>

      {/* ── Right: Login Card ────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-gray-50">

        {/* Mobile logo */}
        <div className="md:hidden mb-8">
          <TrustyProLogo height={40} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#EEF2FF" }}>
                <Home className="w-7 h-7" style={{ color: ACCENT }} />
              </div>
              <h1 className="text-2xl font-black text-gray-900">Welcome Home</h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to your TrustyPro account</p>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              Sign In to My Home
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">New to TrustyPro?</span>
              </div>
            </div>

            {/* Create Account Button */}
            <button
              onClick={handleSignUp}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Create Free Home Profile
            </button>

            {/* Trust signals */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure login</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Free forever</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> No spam</span>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/trustypro")}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Back to TrustyPro
            </button>
          </div>

          {/* Partner separator */}
          <div className="text-center mt-4">
            <span className="text-xs text-gray-300">Are you a home service pro? </span>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-xs font-semibold hover:underline"
              style={{ color: ACCENT }}
            >
              Partner Login →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
