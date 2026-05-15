import React from 'react';
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Eye, EyeOff, Lock, AlertCircle, Check, X } from "lucide-react";

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs transition-colors ${met ? "text-emerald-600" : "text-gray-400"}`}>
      {met ? <Check className="w-3.5 h-3.5 flex-shrink-0" /> : <X className="w-3.5 h-3.5 flex-shrink-0" />}
      {label}
    </div>
  );
}

function strengthLevel(pw: string): 0 | 1 | 2 | 3 | 4 {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score as 0 | 1 | 2 | 3 | 4;
}

const STRENGTH_LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["bg-gray-200", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-500"];

export default function SetPassword() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") ?? "";
  const isReset = params.get("mode") === "reset";

  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirm && confirm.length > 0;

  const strength = strengthLevel(password);
  const isValid = hasMinLength && hasSpecial;

  const setPasswordMutation = trpc.partnerAuth.setPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2500);
    },
    onError: (err) => {
      setError(err.message || "Something went wrong. The link may have expired.");
    },
  });

  useEffect(() => {
    if (!token) {
      setError(
        isReset
          ? "Invalid or missing reset link. Please request a new one."
          : "Invalid or missing activation link. Please contact support."
      );
    }
  }, [token, isReset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValid) {
      setError("Password must be at least 8 characters and include a special character.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setPasswordMutation.mutate({ token, password });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-9 h-9 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isReset ? "Password updated!" : "Welcome to ProLnk!"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {isReset
              ? "Your password has been reset successfully. Redirecting to your dashboard..."
              : "Your partner account is now active. Redirecting to your dashboard..."}
          </p>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full animate-pulse"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5E642] flex items-center justify-center">
              <Lock className="w-4.5 h-4.5 text-[#0A1628]" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">ProLnk</span>
          </div>
          <p className="text-white/50 text-sm">Partner Network</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header strip */}
          <div className="bg-[#0A1628] px-6 py-5 border-b border-white/5">
            <h1 className="text-white text-lg font-bold">
              {isReset ? "Reset Your Password" : "Activate Your Account"}
            </h1>
            <p className="text-white/50 text-xs mt-1">
              {isReset
                ? "Enter a new password for your ProLnk partner account."
                : "Create a secure password to activate your ProLnk partner account."}
            </p>
          </div>

          <div className="p-6 space-y-5">
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {!token ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-gray-500 text-sm">
                  {isReset
                    ? "This reset link is invalid or has expired."
                    : "This activation link is invalid or has expired."}
                </p>
                {isReset ? (
                  <button
                    onClick={() => navigate("/partner/dashboard")}
                    className="text-[#0A1628] hover:underline text-sm font-semibold"
                  >
                    Request a new reset link
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Please contact{" "}
                    <a href="mailto:support@prolnk.io" className="text-[#0A1628] hover:underline font-semibold">
                      support@prolnk.io
                    </a>
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="pr-10 h-10 border-gray-200 focus:border-[#0A1628] focus:ring-[#0A1628]/20"
                      autoComplete="new-password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((lvl) => (
                          <div
                            key={lvl}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              strength >= lvl ? STRENGTH_COLORS[strength] : "bg-gray-100"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400">{STRENGTH_LABELS[strength]}</p>
                    </div>
                  )}

                  {/* Password rules */}
                  {password.length > 0 && (
                    <div className="grid grid-cols-2 gap-1 pt-1 bg-gray-50 rounded-lg p-2.5">
                      <PasswordRule met={hasMinLength} label="8+ characters" />
                      <PasswordRule met={hasSpecial} label="Special character (!@#…)" />
                      <PasswordRule met={hasUpperLower} label="Upper + lowercase" />
                      <PasswordRule met={hasNumber} label="Number" />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat your password"
                    className={`h-10 transition-colors ${
                      confirm.length > 0
                        ? passwordsMatch
                          ? "border-emerald-400 focus:border-emerald-500"
                          : "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-[#0A1628]"
                    }`}
                    autoComplete="new-password"
                  />
                  {confirm.length > 0 && !passwordsMatch && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-semibold text-sm"
                  style={{ backgroundColor: "#0A1628", color: "#F5E642" }}
                  disabled={setPasswordMutation.isPending || !token}
                >
                  {setPasswordMutation.isPending
                    ? isReset
                      ? "Resetting..."
                      : "Activating..."
                    : isReset
                    ? "Reset Password"
                    : "Activate My Account"}
                </Button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-white/40 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/partner/dashboard")}
            className="text-[#F5E642] hover:text-white transition-colors font-semibold"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
