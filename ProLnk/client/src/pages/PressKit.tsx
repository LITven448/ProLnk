import { useState } from "react";
import { Link } from "wouter";

const MILESTONES = [
  { date: "May 2026", label: "Founding network open", desc: "Charter and Founding partner tiers launched. Limited to 2,125 spots." },
  { date: "May 2026", label: "TrustyPro AI scan launch", desc: "AI-powered visual home health scanning system goes live for DFW homeowners." },
  { date: "May 2026", label: "800K DFW homes targeted", desc: "Full DFW metro coverage mapped across 93 trade service categories." },
  { date: "2024", label: "Company founded", desc: "ProLnk + TrustyPro founded by Andrew Frakes in DFW, Texas." },
];

const PRESS_STATS = [
  { stat: "$600B", label: "US Home Services Market" },
  { stat: "800K+", label: "DFW Homes Addressable" },
  { stat: "93", label: "Trade Service Categories" },
  { stat: "5", label: "Income Streams per Pro" },
  { stat: "2,125", label: "Founding Partner Spots" },
  { stat: "AI-Powered", label: "Lead Matching + Home Scanning" },
];

export default function PressKit() {
  const [form, setForm] = useState({ name: "", outlet: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const mailto = `mailto:press@prolnk.io?subject=Interview%20Request%20—%20${encodeURIComponent(form.outlet)}&body=${encodeURIComponent(
      `Name: ${form.name}\nOutlet: ${form.outlet}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080b12", color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <header style={{ borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#22c55e" }}>ProLnk</span>
          <span style={{ color: "#64748b", fontSize: 12, marginLeft: 8 }}>Press Room</span>
        </Link>
        <a href="mailto:press@prolnk.io" style={{ fontSize: 13, color: "#22c55e", textDecoration: "none" }}>press@prolnk.io</a>
      </header>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "70px 40px 50px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 20, padding: "4px 14px", fontSize: 11, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 22 }}>
          Press &amp; Media
        </div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, lineHeight: 1.15, color: "#f8fafc", marginBottom: 16 }}>
          ProLnk + TrustyPro<br />Press Kit
        </h1>
        <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.7 }}>
          Assets, facts, and media contact for journalists, analysts, and content creators
          covering PropTech, home services, and AI-powered marketplaces.
        </p>
      </section>

      {/* Logo Download */}
      <section style={{ maxWidth: 800, margin: "0 auto 70px", padding: "0 24px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>Brand Assets</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { name: "ProLnk Logo", color: "#22c55e", bg: "#0f172a" },
            { name: "TrustyPro Logo", color: "#3b82f6", bg: "#0f172a" },
            { name: "Combined Lockup", color: "#a855f7", bg: "#0f172a" },
          ].map((asset) => (
            <div key={asset.name} style={{ background: asset.bg, border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "#0d1117", borderBottom: "1px solid #1e293b" }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: asset.color }}>{asset.name.split(" ")[0]}</span>
              </div>
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{asset.name}</span>
                <a
                  href="mailto:press@prolnk.io?subject=Logo%20Asset%20Request"
                  style={{ fontSize: 12, color: "#22c55e", textDecoration: "none", fontWeight: 600 }}
                >
                  Request ↗
                </a>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#475569", marginTop: 14 }}>
          High-resolution PNG, SVG, and brand guidelines available on request. Email{" "}
          <a href="mailto:press@prolnk.io" style={{ color: "#22c55e" }}>press@prolnk.io</a>.
        </p>
      </section>

      {/* Company Fact Sheet */}
      <section style={{ maxWidth: 800, margin: "0 auto 70px", padding: "0 24px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>Company Fact Sheet</h2>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" }}>
          {[
            { label: "Full Name", value: "ProLnk Inc. / TrustyPro (brand of ProLnk)" },
            { label: "Founded", value: "2024" },
            { label: "Headquarters", value: "DFW, Texas, USA" },
            { label: "Sector", value: "PropTech / Home Services / AI Marketplace" },
            { label: "Stage", value: "Pre-Seed, Founding Network Open" },
            { label: "Mission", value: "Build the network infrastructure for the $600B home services market" },
            { label: "Products", value: "ProLnk (pro-facing marketplace) + TrustyPro (homeowner platform + Home Health Vault)" },
          ].map((row, i) => (
            <div key={row.label} style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: i < 6 ? "1px solid #1e293b" : "none" }}>
              <div style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", borderRight: "1px solid #1e293b" }}>{row.label}</div>
              <div style={{ padding: "14px 20px", fontSize: 14, color: "#cbd5e1" }}>{row.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Bio */}
      <section style={{ maxWidth: 800, margin: "0 auto 70px", padding: "0 24px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>Executive Team</h2>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "28px 32px", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #0ea5e9)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "#000" }}>AF</div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>Andrew Frakes</div>
            <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 600, marginBottom: 14 }}>Founder &amp; CEO, ProLnk + TrustyPro</div>
            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
              Andrew Frakes is a systems entrepreneur and founder of ProLnk and TrustyPro — a two-sided
              home services marketplace with a permanent data moat. Based in DFW, Texas, Andrew is building
              the network infrastructure layer for the $600B home services market, combining AI-powered
              lead matching, a 5-stream income model for service professionals, and the Home Health Vault,
              a property data asset targeting 50M+ homes.
            </p>
            <div style={{ marginTop: 16 }}>
              <a href="mailto:andrew@lit-ventures.com" style={{ fontSize: 13, color: "#22c55e", textDecoration: "none" }}>andrew@lit-ventures.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats for Press */}
      <section style={{ maxWidth: 800, margin: "0 auto 70px", padding: "0 24px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>Key Stats for Press</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
          {PRESS_STATS.map((s) => (
            <div key={s.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#22c55e", marginBottom: 6 }}>{s.stat}</div>
              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section style={{ maxWidth: 800, margin: "0 auto 70px", padding: "0 24px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>The Story</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>The Problem</div>
            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
              Homeowners can't find qualified, trustworthy service professionals. Pros waste money on
              unqualified leads. No platform owns the full relationship — and no one has built a durable
              data moat around the 140M homes in the US.
            </p>
          </div>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>The Solution</div>
            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
              ProLnk pairs AI-powered job matching with a 5-stream income model that makes partner
              retention self-sustaining. TrustyPro's Home Health Vault creates a permanent property data
              asset — structural health, maintenance history, and AI visual scans — locked to the home,
              not the user.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section style={{ maxWidth: 700, margin: "0 auto 70px", padding: "0 24px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>Recent Milestones</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {MILESTONES.map((m, i) => (
            <div key={m.label} style={{ display: "flex", gap: 20, paddingBottom: i < MILESTONES.length - 1 ? 28 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                {i < MILESTONES.length - 1 && <div style={{ width: 2, flex: 1, background: "#1e293b", marginTop: 6 }} />}
              </div>
              <div style={{ paddingBottom: i < MILESTONES.length - 1 ? 0 : 0 }}>
                <div style={{ fontSize: 11, color: "#475569", marginBottom: 4 }}>{m.date}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>{m.label}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interview Request Form */}
      <section style={{ maxWidth: 640, margin: "0 auto 100px", padding: "0 24px" }}>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "36px 40px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>Request an Interview</h2>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 28, lineHeight: 1.6 }}>
            We welcome media inquiries from journalists, podcasters, and analysts. Fill out the form
            below and we'll respond within 24 hours.
          </p>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#22c55e", marginBottom: 8 }}>Request Sent</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>We'll be in touch within 24 hours.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Your Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    style={{ width: "100%", background: "#0d1117", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Publication / Outlet *</label>
                  <input
                    required
                    value={form.outlet}
                    onChange={(e) => setForm((f) => ({ ...f, outlet: e.target.value }))}
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
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="jane@publication.com"
                  style={{ width: "100%", background: "#0d1117", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your story angle or interview topic…"
                  style={{ width: "100%", background: "#0d1117", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box", outline: "none", resize: "vertical" }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                style={{ background: "#22c55e", color: "#000", border: "none", padding: "13px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? "Sending…" : "Send Interview Request"}
              </button>
            </form>
          )}
          <div style={{ marginTop: 20, borderTop: "1px solid #1e293b", paddingTop: 20, fontSize: 12, color: "#334155", textAlign: "center" }}>
            Press contact: <a href="mailto:press@prolnk.io" style={{ color: "#22c55e" }}>press@prolnk.io</a>
          </div>
        </div>
      </section>

    </div>
  );
}
