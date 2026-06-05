import React from 'react';
import type React from "react";
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { Shield, CheckCircle, Home, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const TEAL = "#00B5B8";
const TEAL_LIGHT = "#E0F7F7";
const BG = "#F7FFFE";

export default function HomeownerLogin() {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<"login" | "create">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.homeownerAuth.login.useMutation({
    onSuccess: () => navigate("/trustypro/home-health"),
    onError: (e) => setError(e.message || "Invalid email or password. Please try again."),
  });

  const registerMutation = trpc.homeownerAuth.register.useMutation({
    onSuccess: () => navigate("/trustypro/home-health"),
    onError: (e) => setError(e.message || "Could not create your account. Please try again."),
  });

  const isPending = loginMutation.isPending || registerMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "create") {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      registerMutation.mutate({ name, email, password, phone: phone || undefined });
    } else {
      loginMutation.mutate({ email, password });
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: BG, fontFamily: "'Inter', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <TrustyProLogo height={44} />
          <p className="text-sm text-gray-500 mt-3">Sign in to access your Home Health dashboard</p>
        </div>

        <div
          className="bg-white rounded-2xl shadow-xl border p-8"
          style={{ borderColor: `${TEAL}30` }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: TEAL_LIGHT }}
            >
              <Home className="w-6 h-6" style={{ color: TEAL }} />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">
                {mode === "create" ? "Create Your Account" : "Welcome Back"}
              </h1>
              <p className="text-xs text-gray-500">
                {mode === "create" ? "Homeowner Sign Up" : "Homeowner Login"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "create" && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Homeowner"
                    required
                    minLength={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-shadow"
                    style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Phone <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 555-5555"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-shadow"
                    style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-shadow"
                style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-shadow pr-11"
                  style={{ "--tw-ring-color": TEAL } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="text-sm px-4 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#DC2626" }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: TEAL }}
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {mode === "create" ? "Creating Account…" : "Signing In…"}
                </>
              ) : (
                <>
                  {mode === "create" ? "Create Account" : "Sign In to My Home"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">
                {mode === "create" ? "Already have an account?" : "New to TrustyPro?"}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setError("");
              setMode(mode === "create" ? "login" : "create");
            }}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {mode === "create" ? "Sign In Instead" : "Create Free Home Profile"}
          </button>

          <div className="mt-5 flex items-center justify-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" style={{ color: TEAL }} /> Secure login
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" style={{ color: TEAL }} /> Free forever
            </span>
          </div>
        </div>

        <div className="text-center mt-6 space-y-2">
          <button
            onClick={() => navigate("/trustypro")}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Back to TrustyPro
          </button>
        </div>
      </motion.div>
    </div>
  );
}
