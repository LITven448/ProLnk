/**
 * TrustyProComingSoon
 * Shown for all /my-home/* and /trustypro/scan routes during the waitlist phase.
 * Waitlist members see a personalized holding page.
 * Non-members are redirected to the waitlist form.
 *
 * TO UNLOCK THE PORTAL: Remove the <Route> wrappers in App.tsx that point to this
 * component and restore the original component imports.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Bell, ArrowRight, Shield, Zap, Star } from "lucide-react";
import { TrustyProLogo } from "@/components/TrustyProLogo";

const ACCENT = "#4F46E5";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TrustyProComingSoon() {
  const [, navigate] = useLocation();

  useEffect(() => { document.title = "TrustyPro — Coming Soon"; }, []);
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #0F0C29 0%, #1B1464 50%, #24243e 100%)" }}
    >
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between max-w-3xl mx-auto w-full">
        <TrustyProLogo height={32} variant="dark" />
        <button
          onClick={() => navigate("/waitlist/homeowner")}
          className="text-xs font-semibold text-indigo-300 hover:text-white transition-colors border border-indigo-500/40 px-4 py-2 rounded-full hover:border-indigo-400"
        >
          Join the Waitlist
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full text-center">

          {/* Animated badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ backgroundColor: "rgba(79,70,229,0.2)", border: "1.5px solid rgba(99,102,241,0.4)" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-indigo-300">DFW Beta — Coming Soon</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            Your Home Portal<br />
            <span style={{ color: "#818cf8" }}>Is Almost Ready</span>
          </motion.h1>

          <motion.p
            className="text-white/60 text-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            You're on the waitlist. We're finalizing our network of verified pros in your area.
            You'll be the first to know the moment we launch.
          </motion.p>

          {/* What's coming */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            {[
              {
                icon: <Zap className="w-4 h-4 text-indigo-400" />,
                title: "AI Home Scan",
                desc: "Upload photos — AI analyzes 100+ categories of issues, improvements & repairs",
              },
              {
                icon: <Shield className="w-4 h-4 text-green-400" />,
                title: "Verified Pro Matching",
                desc: "Background-checked, insured pros matched to your exact needs",
              },
              {
                icon: <Star className="w-4 h-4 text-yellow-400" />,
                title: "Home Health Vault",
                desc: "Track your roof life, HVAC age, maintenance history, and home value",
              },
              {
                icon: <Bell className="w-4 h-4 text-indigo-400" />,
                title: "Smart Alerts",
                desc: "Get notified when a pro in your area is available for your project",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/waitlist/homeowner")}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ACCENT }}
            >
              Join the Waitlist <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/waitlist/homeowner/status")}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white/80 hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Check My Waitlist Status
            </button>
          </motion.div>

          <p className="text-xs text-white/25 mt-6">
            Already on the waitlist? Check your email for your confirmation and referral code.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center">
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} TrustyPro · DFW Beta · All rights reserved
        </p>
      </div>
    </div>
  );
}
