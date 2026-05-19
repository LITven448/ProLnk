import React from 'react';
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { CheckCircle, Zap, Shield, TrendingUp, Clock, Star, Users, Camera, Network, CreditCard } from "lucide-react";

const BENEFITS = [
  { icon: TrendingUp, title: "72% Commission Keep Rate", desc: "The highest rate on the platform — locked forever at this tier." },
  { icon: Zap, title: "4-Level Network Override", desc: "Earn on every job completed by up to 4 levels of your recruited network." },
  { icon: Clock, title: "90-Day Free Trial", desc: "Zero cost for 90 days. Full access from day one. Then $149/mo locked for life." },
  { icon: Shield, title: "1.5% Origination Rights", desc: "Earn a perpetual 1.5% on every job at every home you document — forever." },
  { icon: Star, title: "AI-Driven Lead Generation", desc: "Our AI scans your job photos across 65+ categories to generate cross-trade referral leads automatically." },
  { icon: CheckCircle, title: "$149/mo Locked Forever", desc: "This rate never increases. Future partners will pay more. You won't." },
];

const NEXT_STEPS = [
  { icon: Users, day: "Day 1″, title: "Access your partner dashboard", desc: "Your account is live. See your referral link, commission tracker, and network map." },
  { icon: Camera, day: "Day 1″, title: "Start uploading job photos", desc: "Each photo you tag unlocks AI analysis — turning your work history into a lead engine." },
  { icon: Network, day: "Day 30″, title: "Your referral network starts earning overrides", desc: "When the pros you recruit complete jobs, your 4-level override cascade starts paying automatically." },
  { icon: CreditCard, day: "Day 90″, title: "First billing day — cancel anytime before", desc: "$149/mo begins. No surprise fees. Cancel before day 90 and you owe nothing." },
];

const SOCIAL_AVATARS = ["AJ", "MR", "TC", "KL", "DB", "SN", "PW", "JH", "EM", "RG"];

export default function PartnerCheckout() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const checkout = trpc.stripe.createFoundingNetworkCheckout.useMutation({
    onSuccess: (data) => { if (data.url) window.location.href = data.url; },
    onError: (e) => setError(e.message || "Something went wrong. Please try again."),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setError("Please enter your email address."); return; }
    setError("");
    checkout.mutate({ email });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, fontFamily: "'Inter', system-ui", color: "#F5F0E8" }}>
      {/* Nav */}
      <div style={{ padding: "16px 32px", borderBottom: "1px solid rgba(245,240,232,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 20, fontWeight: 700 }}>ProLnk</span>
        <a href="/" style={{ color: "rgba(245,240,232,0.5)", fontSize: 14, textDecoration: "none" }}>← Back to homepage</a>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px", display: "grid", gridTemplateColumns: "1fr 420px", gap: 64, alignItems: "start" }}>
        {/* Left: benefits */}
        <div>
          {/* Social proof bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, padding: "8px 16px", width: "fit-content" }}>
            <div style={{ display: "flex" }}>
              {SOCIAL_AVATARS.map((initials, i) => (
                <div key={initials} style={{ width: 24, height: 24, borderRadius: "50%", background: `hsl(${i * 36}, 60%, 40%)`, border: "2px solid #0A1628″, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, marginLeft: i === 0 ? 0 : -8, zIndex: SOCIAL_AVATARS.length - i }}>
                  {initials}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 13, color: "#10B981″, fontWeight: 600 }}>10 pros already on the founding network</span>
          </div>

          <div style={{ display: "inline-block", border: "1px solid rgba(232,160,32,0.4)", borderRadius: 100, padding: "4px 16px", fontSize: 11, letterSpacing: "0.12em", color: "#E8A020″, textTransform: "uppercase", marginBottom: 24 }}>
            ✦ Founding Network — Limited Spots
          </div>
          <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}>
            Join the Founding Network.<br />
            <span style={{ color: "#E8A020″ }}>Lock your rate forever.</span>
          </h1>
          <p style={{ color: "rgba(245,240,232,0.65)", fontSize: 18, lineHeight: 1.6, marginBottom: 48 }}>
            The first 2,125 approved professionals lock in $149/mo forever — regardless of future price increases.
            90 days free, then billing begins. Cancel anytime.
          </p>

          {/* 6 founding benefits */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 64 }}>
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 18px" }}>
                <Icon style={{ width: 20, height: 20, color: "#E8A020″, marginBottom: 10 }} />
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: "rgba(245,240,232,0.55)", lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* What happens next */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>What happens next</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {NEXT_STEPS.map(({ icon: Icon, day, title, desc }, idx) => (
                <div key={day + title} style={{ display: "flex", gap: 20, position: "relative", paddingBottom: idx < NEXT_STEPS.length - 1 ? 32 : 0 }}>
                  {/* Timeline line */}
                  {idx < NEXT_STEPS.length - 1 && (
                    <div style={{ position: "absolute", left: 19, top: 40, width: 2, bottom: 0, background: "rgba(255,255,255,0.07)" }} />
                  )}
                  {/* Icon circle */}
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: 18, height: 18, color: "#E8A020″ }} />
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8A020″, marginBottom: 4 }}>{day}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: "rgba(245,240,232,0.5)", lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: checkout form */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px 32px", position: "sticky", top: 24 }}>
          {/* Trial countdown callout */}
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "14px 16px", marginBottom: 28, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981″, marginBottom: 2 }}>90 days free, then $149/mo locked forever</div>
            <div style={{ fontSize: 12, color: "rgba(245,240,232,0.45)" }}>No charge today. Cancel before day 90 — owe nothing.</div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#E8A020″ }}>$149<span style={{ fontSize: 18, color: "rgba(245,240,232,0.5)" }}>/mo</span></div>
            <div style={{ fontSize: 14, color: "rgba(245,240,232,0.5)", marginTop: 4 }}>after free trial · locked for life</div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "rgba(245,240,232,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Email Address</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#F5F0E8″, fontSize: 15, boxSizing: "border-box" as const, outline: "none" }}
              />
            </div>
            {error && <div style={{ color: "#F87171″, fontSize: 13, background: "rgba(239,68,68,0.1)", padding: "10px 12px", borderRadius: 8 }}>{error}</div>}
            <button type="submit" disabled={checkout.isPending} style={{ background: "#E8A020″, color: "#0A1628", border: "none", borderRadius: 100, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%", opacity: checkout.isPending ? 0.7 : 1 }}>
              {checkout.isPending ? "Redirecting to Stripe..." : "Start Free 90-Day Trial →"}
            </button>
          </form>

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
            {["No credit card required during trial", "Cancel anytime — no lock-in contracts", "Secure checkout via Stripe", "Rate locked at $149/mo after trial"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "rgba(245,240,232,0.5)" }}>
                <CheckCircle style={{ width: 14, height: 14, color: "#10B981″, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(245,240,232,0.3)", marginTop: 20 }}>
            Spots filling fast · 2,125 total founding network capacity
          </p>
        </div>
      </div>
    </div>
  );
}
