import React from "react";
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { TrustyProLogo } from "@/components/TrustyProLogo";
import { Shield, CheckCircle, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const TEAL = "#00B5B8";
const TEAL_LIGHT = "#E0F7F7";
const INDIGO = "#4F46E5";
const BG = "#F7FFFE";

function getToken(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("token") ?? "";
}

export default function ResetPassword() {
  const [, navigate] = useLocation();
  const [token] = useState(getToken);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const resetMutation = trpc.homeownerAuth.resetPassword.useMutation({
    onSuccess: () => setDone(true),
    onError: (e) => setError(e.message || "Could not reset your password. Please try again."),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!token) {
      setError("This reset link is missing or invalid. Please request a new one.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    resetMutation.mutate({ token, newPassword: password });
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
          <p className="text-sm text-gray-500 mt-3">Set a new password for your account</p>
        </div>

        <div
          className="bg-white rounded-2xl shadow-xl border p-8"
          style={{ borderColor: `${TEAL}30` }}
        >
          {done ? (
            <div className="text-center py-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: TEAL_LIGHT }}
              >
                <CheckCircle className="w-7 h-7" style={{ color: TEAL }} />
              </div>
              <h1 className="text-xl font-black text-gray-900 mb-2">Password Reset</h1>
              <p className="text-sm text-gray-500 mb-6">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <button
                onClick={() => navigate("/trustypro/homeowner-login")}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: INDIGO }}
              >
                Go to Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: TEAL_LIGHT }}
                >
                  <Lock className="w-6 h-6" style={{ color: INDIGO }} />
                </div>
                <div>
                  <h1 className="text-xl font-black text-gray-900">Reset Password</h1>
                  <p className="text-xs text-gray-500">Choose a new password</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-shadow pr-11"
                      style={{ "--tw-ring-color": INDIGO } as React.CSSProperties}
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 transition-shadow"
                    style={{ "--tw-ring-color": INDIGO } as React.CSSProperties}
                  />
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
                  disabled={resetMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: INDIGO }}
                >
                  {resetMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating…
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-5 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" style={{ color: TEAL }} /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" style={{ color: TEAL }} /> Encrypted
                </span>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/trustypro/homeowner-login")}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Back to Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
}
