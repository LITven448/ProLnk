import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  Download, Mail, Copy, CheckCircle, Newspaper,
  Image, BarChart3, Users, Globe, Zap, Building2,
  ExternalLink, ChevronRight
} from "lucide-react";

const PRESS_STATS = [
  { stat: "$600B", label: "US Home Services TAM" },
  { stat: "800K+", label: "DFW Homes Addressable" },
  { stat: "93", label: "Trade Service Categories" },
  { stat: "5", label: "Income Streams per Pro" },
  { stat: "2,125", label: "Founding Partner Spots" },
  { stat: "47", label: "Autonomous AI Agents" },
];

const FACT_SHEET = [
  { label: "Legal Name", value: "ProLnk Inc." },
  { label: "Brand Portfolio", value: "ProLnk + TrustyPro + Home Health Vault" },
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "DFW, Texas, USA" },
  { label: "Sector", value: "PropTech / Home Services / AI Marketplace" },
  { label: "Stage", value: "Pre-Seed — Founding Network Open" },
  { label: "Launch Market", value: "Dallas-Fort Worth Metro (800K+ homes)" },
  { label: "Mission", value: "Build the network economy for the $600B home services market" },
  { label: "Technology", value: "React 19, Node.js, TiDB, Claude AI, Railway Cloud" },
  { label: "Press Contact", value: "press@prolnk.io" },
];

const MILESTONES = [
  { date: "May 2026", label: "Platform Launch & Founding Network Open", desc: "Charter (25 spots) and Founding (100 total) partner tiers launched. Limited founding network open to pre-screened service professionals.", badge: "Live" },
  { date: "May 2026", label: "TrustyPro AI Visual Scan System", desc: "AI-powered home health scanning system goes live for DFW homeowners. Detects 50+ issue types from photos.", badge: "Live" },
  { date: "May 2026", label: "800K DFW Homes Mapped", desc: "Full DFW metro coverage mapped across 93 trade service categories. Foundation for the Home Health Vault data asset.", badge: "Live" },
  { date: "2025", label: "Full Platform Build Complete", desc: "ProLnk partner portal (~80 screens), TrustyPro homeowner portal (~60 screens), admin command center, and 47 autonomous AI agents deployed.", badge: null },
  { date: "2024", label: "Company Founded", desc: "ProLnk + TrustyPro founded by Andrew Frakes in DFW, Texas with the vision to own the network layer for home services.", badge: null },
];

const LOGO_VARIANTS = [
  { name: "ProLnk — Primary (Dark BG)", color: "#22c55e", bg: "#080b12", border: "#22c55e30", desc: "Horizontal lockup, white background" },
  { name: "ProLnk — Light Version", color: "#16a34a", bg: "#f0fdf4", border: "#22c55e20", textColor: "#16a34a", desc: "For light backgrounds and print" },
  { name: "TrustyPro — Primary", color: "#3b82f6", bg: "#080b12", border: "#3b82f630", desc: "TrustyPro brand, horizontal lockup" },
  { name: "Combined Lockup", color: "#a855f7", bg: "#080b12", border: "#a855f730", desc: "ProLnk + TrustyPro joint mark" },
  { name: "Home Health Vault Mark", color: "#f59e0b", bg: "#080b12", border: "#f59e0b30", desc: "Vault data product brand" },
  { name: "Icon Only — ProLnk", color: "#22c55e", bg: "#0f172a", border: "#1e293b", isIcon: true, desc: "Square icon, app icons, favicons" },
];

const SCREENSHOT_PLACEHOLDERS = [
  { label: "Partner Dashboard", icon: BarChart3, desc: "5-stream earnings overview, tier progress, referral network" },
  { label: "TrustyPro AI Scan", icon: Zap, desc: "AI visual home health scan with issue detection results" },
  { label: "Admin Command Center", icon: Building2, desc: "Real-time platform metrics, partner management, AI pipeline status" },
  { label: "Home Health Vault", icon: Globe, desc: "Homeowner property dashboard with health records and service history" },
];

const BOILERPLATE = `ProLnk Inc. is building the network economy for the $600B US home services market. Through its two-brand platform — ProLnk (pro-facing marketplace) and TrustyPro (homeowner platform and Home Health Vault) — the company connects service professionals with homeowners via AI-powered lead matching and a 5-stream income model designed for long-term partner retention.

The ProLnk Network Income System gives service professionals five independent income streams: direct commissions (12–70% by tier), a 4-level network override, recurring subscription overrides, homeowner lead fees, and permanent origination rights tied to homes in the Home Health Vault.

TrustyPro's Home Health Vault creates a permanent property data asset — AI visual scans, structural health records, and maintenance history — locked to the home, not the user, targeting 50M+ US properties.

ProLnk was founded in 2024 by Andrew Frakes in Dallas-Fort Worth, Texas. The company is currently in pre-seed stage with a founding network of 2,125 partner spots open to vetted service professionals.`;

const IN_THE_NEWS_PLACEHOLDERS = [
  { outlet: "TechCrunch", headline: "Placeholder — Coverage pending", date: "2026" },
  { outlet: "Forbes", headline: "Placeholder — Coverage pending", date: "2026" },
  { outlet: "Inman News", headline: "Placeholder — Coverage pending", date: "2026" },
];

export default function PressKit() {
  const [form, setForm] = useState({ name: "", outlet: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const subject = `Interview Request — ${form.outlet}`;
    const body = `Name: ${form.name}\nOutlet: ${form.outlet}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:press@prolnk.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 500);
  }

  function copyBoilerplate() {
    navigator.clipboard.writeText(BOILERPLATE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <>
      <Helmet>
        <title>ProLnk Press Kit — Media Resources</title>
        <meta name="description" content="Press kit for journalists, analysts, and content creators covering ProLnk and TrustyPro. Brand assets, company facts, boilerplate, and media contact." />
      </Helmet>

      <div style={{ minHeight: "100vh", background: "#080b12", color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>

        {/* Nav */}
        <header style={{ borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#080b12", zIndex: 50 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#22c55e" }}>ProLnk</span>
            <span style={{ color: "#334155", fontSize: 12 }}>Press Room</span>
          </Link>
          <a href="mailto:press@prolnk.io" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>
            <Mail size={14} /> press@prolnk.io
          </a>
        </header>

        {/* Hero */}
        <section style={{ textAlign: "center", padding: "80px 40px 60px", maxWidth: 740, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20, padding: "5px 16px", fontSize: 11, color: "#22c55e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 26 }}>
            <Newspaper size={11} /> Press &amp; Media Kit
          </div>
          <h1 style={{ fontSize: "clamp(26px, 4.5vw, 44px)", fontWeight: 900, lineHeight: 1.1, color: "#f8fafc", marginBottom: 18, letterSpacing: "-0.02em" }}>
            ProLnk + TrustyPro<br />Press Kit
          </h1>
          <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.75, marginBottom: 32 }}>
            Brand assets, company facts, boilerplate copy, and media contact for journalists,
            analysts, and content creators covering PropTech, home services, and AI marketplaces.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:press@prolnk.io" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#22c55e", color: "#000", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 8, textDecoration: "none" }}>
              <Mail size={14} /> Contact Press Team
            </a>
            <a href="#boilerplate" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", color: "#94a3b8", fontWeight: 600, fontSize: 14, padding: "12px 24px", borderRadius: 8, border: "1px solid #1e293b", textDecoration: "none" }}>
              <Copy size={14} /> Get Boilerplate
            </a>
          </div>
        </section>

        {/* Quick Stats */}
        <section style={{ maxWidth: 1000, margin: "0 auto 80px", padding: "0 24px" }}>
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28 }}>Key Facts for Press</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
            {PRESS_STATS.map(s => (
              <div key={s.label} style={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: 10, padding: "22px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#22c55e", letterSpacing: "-0.02em", marginBottom: 6 }}>{s.stat}</div>
                <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Company Overview */}
        <section style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 24 }}>Company Overview</h2>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "28px 32px" }}>
            <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.8, margin: "0 0 20px" }}>
              ProLnk Inc. is building the <strong style={{ color: "#f1f5f9" }}>network economy for the $600 billion US home services market</strong>. Through two complementary brands — <strong style={{ color: "#22c55e" }}>ProLnk</strong> (the professional network) and <strong style={{ color: "#3b82f6" }}>TrustyPro</strong> (the homeowner platform) — the company has built an AI-powered two-sided marketplace designed to permanently own the relationship layer between service professionals and the homes they serve.
            </p>
            <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.8, margin: "0 0 20px" }}>
              The ProLnk Network Income System gives service professionals five independent income streams — from direct commissions to a 4-level network cascade to permanent origination rights tied to properties in the Home Health Vault. This model creates structural retention: once a partner's earnings are entangled across the network, switching cost becomes economically irrational.
            </p>
            <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.8, margin: 0 }}>
              TrustyPro's <strong style={{ color: "#f1f5f9" }}>Home Health Vault</strong> is a permanent property data asset — AI visual health scans, structural records, and maintenance history — locked to the home, not the user. The Vault targets 50M+ US properties as a long-term defensible data moat. The company is founded by Andrew Frakes in Dallas-Fort Worth, Texas.
            </p>
          </div>
        </section>

        {/* Company Fact Sheet */}
        <section style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 24 }}>Company Fact Sheet</h2>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, overflow: "hidden" }}>
            {FACT_SHEET.map((row, i) => (
              <div key={row.label} style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: i < FACT_SHEET.length - 1 ? "1px solid #1e293b" : "none", background: i % 2 === 0 ? "transparent" : "#0d1117" }}>
                <div style={{ padding: "13px 20px", fontSize: 11, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.07em", borderRight: "1px solid #1e293b", display: "flex", alignItems: "center" }}>{row.label}</div>
                <div style={{ padding: "13px 20px", fontSize: 14, color: "#cbd5e1" }}>{row.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The Story — Problem / Solution */}
        <section style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 24 }}>The Story</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#0f172a", border: "1px solid #ef444430", borderRadius: 12, padding: "26px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>The Problem</div>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>
                Homeowners can't find qualified, trustworthy service professionals. Service pros waste 15–30% of revenue on unqualified leads. No platform owns the full relationship — and no one has built a durable data moat around the 140M homes in the US. The referral economy is broken.
              </p>
            </div>
            <div style={{ background: "#0f172a", border: "1px solid #22c55e30", borderRadius: 12, padding: "26px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>The Solution</div>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>
                ProLnk pairs AI-powered job matching with a 5-stream income model that makes retention self-sustaining. TrustyPro's Home Health Vault creates a permanent property data asset — AI visual scans, maintenance history, structural health — locked to the home, not the user.
              </p>
            </div>
          </div>
        </section>

        {/* Logo Downloads */}
        <section style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Brand Assets</h2>
            <a href="mailto:press@prolnk.io?subject=Logo%20Asset%20Request" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>
              <Mail size={13} /> Request full asset pack
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {LOGO_VARIANTS.map(asset => (
              <div key={asset.name} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "center", background: asset.bg, borderBottom: "1px solid #1e293b" }}>
                  {asset.isIcon ? (
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: asset.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: "#000" }}>P</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: 20, fontWeight: 900, color: asset.textColor || asset.color }}>
                      {asset.name.split(" ")[0]}
                    </span>
                  )}
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 4 }}>{asset.name}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginBottom: 10 }}>{asset.desc}</div>
                  <a
                    href="mailto:press@prolnk.io?subject=Logo%20Asset%20Request"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#22c55e", textDecoration: "none", fontWeight: 600 }}
                  >
                    <Download size={12} /> Request file
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "14px 18px", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, fontSize: 12, color: "#475569" }}>
            Available formats: PNG (transparent + white bg), SVG, PDF, AI source files. Usage guidelines included.
            Contact <a href="mailto:press@prolnk.io" style={{ color: "#22c55e" }}>press@prolnk.io</a> for full brand kit.
          </div>
        </section>

        {/* Key Screenshots */}
        <section style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Key Screenshots</h2>
            <a href="mailto:press@prolnk.io?subject=Screenshot%20Request" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>
              <Image size={13} /> Request hi-res images
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14 }}>
            {SCREENSHOT_PLACEHOLDERS.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ height: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0d1117", gap: 12, borderBottom: "1px solid #1e293b" }}>
                    <Icon size={28} color="#334155" />
                    <span style={{ fontSize: 10, color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em" }}>Screenshot placeholder</span>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Executive Team */}
        <section style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 24 }}>Executive Team</h2>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "32px 36px", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #0ea5e9)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#000" }}>AF</div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>Andrew Frakes</div>
              <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 700, marginBottom: 16 }}>Founder &amp; CEO — ProLnk + TrustyPro</div>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75, margin: "0 0 16px" }}>
                Andrew Frakes is a systems entrepreneur and the founder of ProLnk and TrustyPro, a two-sided home services marketplace with a permanent data moat. Based in Dallas-Fort Worth, Texas, Andrew is building the network infrastructure layer for the $600B home services market — combining AI-powered lead matching, a 5-stream income model for service professionals, and the Home Health Vault, a property data asset targeting 50M+ US homes. ProLnk's 47 autonomous AI agents handle 80% of platform operations from day one.
              </p>
              <a href="mailto:andrew@lit-ventures.com" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#22c55e", textDecoration: "none" }}>
                <Mail size={13} /> andrew@lit-ventures.com
              </a>
            </div>
          </div>
        </section>

        {/* Boilerplate */}
        <section id="boilerplate" style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px" }}>Boilerplate — About ProLnk</h2>
              <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>For use in articles, podcasts, and media coverage. Copy freely.</p>
            </div>
            <button
              onClick={copyBoilerplate}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: copied ? "#22c55e" : "#1e293b", color: copied ? "#000" : "#94a3b8", border: "none", padding: "10px 18px", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}
            >
              {copied ? <><CheckCircle size={14} /> Copied!</> : <><Copy size={14} /> Copy Text</>}
            </button>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "28px 32px" }}>
            {BOILERPLATE.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.8, margin: i < 3 ? "0 0 18px" : 0 }}>{para}</p>
            ))}
          </div>
        </section>

        {/* In The News */}
        <section style={{ maxWidth: 860, margin: "0 auto 80px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>In The News</h2>
          <p style={{ fontSize: 13, color: "#475569", marginBottom: 24 }}>Coverage section — placeholder until first press hits.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {IN_THE_NEWS_PLACEHOLDERS.map(item => (
              <div key={item.outlet} style={{ background: "#0f172a", border: "1px dashed #1e293b", borderRadius: 10, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, opacity: 0.5 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{item.outlet}</div>
                  <div style={{ fontSize: 14, color: "#64748b" }}>{item.headline}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#334155" }}>
                  {item.date} <ExternalLink size={12} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 12, color: "#334155", textAlign: "center" }}>
            Are you covering ProLnk? Let us know at <a href="mailto:press@prolnk.io" style={{ color: "#22c55e" }}>press@prolnk.io</a> — we'll link to your coverage here.
          </p>
        </section>

        {/* Milestones */}
        <section style={{ maxWidth: 760, margin: "0 auto 80px", padding: "0 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 32 }}>Company Timeline</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {MILESTONES.map((m, i) => (
              <div key={m.label} style={{ display: "flex", gap: 22, paddingBottom: i < MILESTONES.length - 1 ? 32 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: m.badge ? "#22c55e" : "#1e293b", border: m.badge ? "none" : "2px solid #334155", flexShrink: 0 }} />
                  {i < MILESTONES.length - 1 && <div style={{ width: 2, flex: 1, background: "#1e293b", marginTop: 6 }} />}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#475569" }}>{m.date}</span>
                    {m.badge && (
                      <span style={{ fontSize: 10, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", borderRadius: 4, padding: "1px 7px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.badge}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interview Form */}
        <section style={{ maxWidth: 640, margin: "0 auto 100px", padding: "0 24px" }}>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "40px 44px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Newspaper size={20} color="#22c55e" />
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Request an Interview</h2>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 28, lineHeight: 1.65 }}>
              We welcome media inquiries from journalists, podcasters, and analysts. Fill out the form
              below and we'll respond within 24 hours.
            </p>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "28px 0" }}>
                <CheckCircle size={36} color="#22c55e" style={{ marginBottom: 14 }} />
                <div style={{ fontSize: 16, fontWeight: 700, color: "#22c55e", marginBottom: 8 }}>Request Sent</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>We'll be in touch within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Your Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Jane Smith"
                      style={{ width: "100%", background: "#0d1117", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box", outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Publication / Outlet *</label>
                    <input
                      required
                      value={form.outlet}
                      onChange={e => setForm(f => ({ ...f, outlet: e.target.value }))}
                      placeholder="TechCrunch"
                      style={{ width: "100%", background: "#0d1117", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box", outline: "none" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jane@publication.com"
                    style={{ width: "100%", background: "#0d1117", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Story Angle / Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us about your story angle or interview topic…"
                    style={{ width: "100%", background: "#0d1117", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box", outline: "none", resize: "vertical" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: "#22c55e", color: "#000", border: "none", padding: "13px", borderRadius: 8, fontWeight: 800, fontSize: 14, cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Sending…" : "Send Interview Request"}
                </button>
              </form>
            )}
            <div style={{ marginTop: 22, borderTop: "1px solid #1e293b", paddingTop: 18, fontSize: 12, color: "#334155", textAlign: "center" }}>
              Press contact: <a href="mailto:press@prolnk.io" style={{ color: "#22c55e" }}>press@prolnk.io</a> · Response within 24 hours
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
