import React from 'react';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Home, Copy, Check, Send, Users, Gift, Star, ChevronRight, Sparkles } from "lucide-react";

type ReferralStatus = "Invited" | "Joined" | "Scanned";

type NeighborReferral = {
  id: string;
  name: string;
  email: string;
  status: ReferralStatus;
  invitedAt: string;
};

const STATUS_CONFIG: Record<ReferralStatus, { color: string; bg: string; dot: string }> = {
  Invited: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", dot: "bg-amber-400" },
  Joined: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", dot: "bg-blue-400" },
  Scanned: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", dot: "bg-green-400" },
};

const MOCK_REFERRALS: NeighborReferral[] = [
  { id: "1", name: "Jennifer K.", email: "j***@gmail.com", status: "Scanned", invitedAt: "2 days ago" },
  { id: "2", name: "Marcus T.", email: "m***@gmail.com", status: "Joined", invitedAt: "4 days ago" },
  { id: "3", name: "Anonymous", email: "a***@icloud.com", status: "Invited", invitedAt: "1 week ago" },
];

function CopyButton({ text, label, variant = "default" }: { text: string; label: string; variant?: "default" | "primary" }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  if (variant === "primary") {
    return (
      <button
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all"
        style={{
          background: copied ? "rgba(34,197,94,0.2)" : "rgba(99,102,241,0.9)",
          color: copied ? "#22c55e" : "#fff",
          border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(99,102,241,0.5)"}`,
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied!" : label}
      </button>
    );
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
      style={{
        background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.07)",
        color: copied ? "#22c55e" : "#d1d5db",
        border: `1px solid ${copied ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.1)"}`,
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied!" : label}
    </button>
  );
}

function MilestoneBar({ joined }: { joined: number }) {
  const goal = 3;
  const pct = Math.min(100, (joined / goal) * 100);
  const remaining = Math.max(0, goal - joined);

  return (
    <div
      className="p-4 rounded-xl space-y-3"
      style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}
    >
      <div className="flex items-center gap-2">
        <Gift size={16} className="text-indigo-400" />
        <span className="text-sm font-semibold text-white">Free Premium Scan Reward</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">
          {joined} of {goal} neighbors joined
        </span>
        {remaining > 0 ? (
          <span className="text-indigo-300 font-medium">{remaining} more to unlock</span>
        ) : (
          <span className="text-green-400 font-bold">Reward unlocked!</span>
        )}
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
        />
      </div>
      <p className="text-xs text-gray-500">
        When 3 neighbors join using your link, you earn a free TrustyPro Premium Scan (valued at $99).
      </p>
    </div>
  );
}

export default function NeighborhoodReferral() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const inviteCode = params.get("code") || "HOME-INVITE-DEFAULT";
  const inviteLink = `https://trustypro.io/join?code=${inviteCode}`;

  const [neighborName, setNeighborName] = useState("");
  const [neighborEmail, setNeighborEmail] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const referrals: NeighborReferral[] = MOCK_REFERRALS;
  const joinedCount = referrals.filter((r) => r.status === "Joined" || r.status === "Scanned").length;

  const joinMutation = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: () => {
      setSubmitState("success");
      setNeighborName("");
      setNeighborEmail("");
    },
    onError: (err) => {
      setSubmitState("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!neighborEmail.trim()) return;
    setSubmitState("loading");
    setErrorMsg("");
    joinMutation.mutate({
      email: neighborEmail.trim(),
      firstName: neighborName.trim() || undefined,
      referralCode: inviteCode,
    } as any);
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: "#0c0f1a", color: "#fff" }}>
      <div className="max-w-lg mx-auto px-4 pt-10 space-y-6">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <Home size={28} className="text-indigo-400" />
          </div>
          <h1 className="text-3xl font-black mb-2 leading-tight">
            Help your neighbors<br />
            <span className="text-indigo-400">protect their homes</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Share TrustyPro with your neighbors. When they join, everyone on your street gets smarter home protection.
          </p>
        </motion.div>

        {/* Milestone bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <MilestoneBar joined={joinedCount} />
        </motion.div>

        {/* Send invite form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-5 rounded-2xl space-y-4"
          style={{ background: "#131726", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Send size={16} className="text-indigo-400" />
            <h2 className="font-bold text-white">Invite a Neighbor by Email</h2>
          </div>

          <AnimatePresence mode="wait">
            {submitState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-4 text-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  <Check size={22} className="text-green-400" />
                </div>
                <p className="text-white font-semibold">Invite sent!</p>
                <p className="text-gray-400 text-xs mt-1">We notified your neighbor. You'll see them appear below when they join.</p>
                <button
                  onClick={() => setSubmitState("idle")}
                  className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 underline"
                >
                  Invite another neighbor
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSendInvite}
                className="space-y-3"
              >
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5">Neighbor's name (optional)</label>
                  <input
                    type="text"
                    value={neighborName}
                    onChange={(e) => setNeighborName(e.target.value)}
                    placeholder="e.g. Mike next door"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-indigo-500"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5">Neighbor's email *</label>
                  <input
                    type="email"
                    value={neighborEmail}
                    onChange={(e) => setNeighborEmail(e.target.value)}
                    placeholder="neighbor@example.com"
                    required
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-indigo-500"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                {submitState === "error" && (
                  <p className="text-red-400 text-xs">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={submitState === "loading" || !neighborEmail.trim()}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
                  style={{ background: "rgba(99,102,241,0.9)", color: "#fff" }}
                >
                  {submitState === "loading" ? "Sending…" : "Send Invite"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Personal invite link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-5 rounded-2xl space-y-3"
          style={{ background: "#131726", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={15} className="text-amber-400" />
            <h2 className="font-bold text-white">Or Copy Your Personal Invite Link</h2>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="text-xs text-gray-400 flex-1 truncate font-mono min-w-0">{inviteLink}</span>
          </div>
          <CopyButton text={inviteLink} label="Copy Invite Link" variant="primary" />
          <p className="text-xs text-gray-600 text-center">Share on Nextdoor, neighborhood Facebook groups, or text it directly</p>
        </motion.div>

        {/* Referral tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-5 rounded-2xl space-y-4"
          style={{ background: "#131726", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-green-400" />
              <h2 className="font-bold text-white">Your Neighbor Referrals</h2>
            </div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              {referrals.length} invited
            </span>
          </div>

          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No referrals yet</p>
              <p className="text-xs text-gray-600 mt-1">Send your first invite above to start tracking</p>
            </div>
          ) : (
            <div className="space-y-2">
              {referrals.map((r) => {
                const cfg = STATUS_CONFIG[r.status];
                return (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                    >
                      {r.name === "Anonymous" ? "?" : r.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{r.name}</p>
                      <p className="text-xs text-gray-500">{r.email} · {r.invitedAt}</p>
                    </div>
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {r.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 pt-1 border-t border-white/5">
            {(["Invited", "Joined", "Scanned"] as ReferralStatus[]).map((s) => {
              const cfg = STATUS_CONFIG[s];
              return (
                <div key={s} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span className="text-xs text-gray-500">{s}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="p-5 rounded-2xl space-y-4"
          style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <div className="flex items-center gap-2">
            <Star size={15} className="text-indigo-400" />
            <h2 className="font-bold text-white text-sm">How It Works</h2>
          </div>
          <div className="space-y-3">
            {[
              { step: "1", text: "Share your personal invite link with neighbors" },
              { step: "2", text: "They sign up for TrustyPro Home Health" },
              { step: "3", text: "When 3 neighbors join, you get a free Premium Scan" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(99,102,241,0.25)", color: "#818cf8" }}
                >
                  {step}
                </div>
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            ))}
          </div>
          <div
            className="flex items-center gap-2 p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Gift size={14} className="text-amber-400 flex-shrink-0" />
            <p className="text-xs text-gray-400">
              Premium Scan includes a full AI-powered home health analysis, safety risk detection, and a 23-point inspection report — valued at $99.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
