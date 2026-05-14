import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  Users, TrendingUp, Shield, Zap, MapPin, Heart,
  Building2, Award, CheckCircle, ChevronRight, Globe,
  Brain, Camera, Network, DollarSign, Star, Lock,
} from "lucide-react";

const NAVY = "#0A1628";
const TEAL = "#14b8a6";
const YELLOW = "#F5E642";
const MUTED = "#64748b";

const STATS = [
  { value: "2,125", label: "Founding Network Spots", icon: Users },
  { value: "47", label: "AI Agents Running 24/7", icon: Brain },
  { value: "85%", label: "Platform Net Margin at Scale", icon: TrendingUp },
  { value: "5", label: "Income Streams per Partner", icon: DollarSign },
];

const VALUES = [
  { icon: Shield, title: "Contractor-First", desc: "We built for the trade professional, not the VC. 72% of job value stays with the pro." },
  { icon: Brain, title: "AI-Powered", desc: "47 autonomous agents handle matching, alerts, payouts — so contractors work, not admin." },
  { icon: Heart, title: "Community-Owned", desc: "The founding network earns overrides forever. Your recruits make you money while you sleep." },
  { icon: Lock, title: "Privacy-First", desc: "Homeowner data is never sold. The Home Health Vault is controlled by the homeowner." },
];

const TEAM = [
  { name: "Andrew Frakes", role: "Founder & CEO", bio: "DFW-based entrepreneur building the network income model for home services.", initials: "AF" },
  { name: "Claude AI", role: "Chief Architecture Officer", bio: "47 autonomous agents deployed across operations, finance, marketing, and field logistics.", initials: "AI" },
];

const TIMELINE = [
  { year: "2024", event: "ProLnk concept developed — network income model for home services trades" },
  { year: "Q1 2025", event: "TrustyPro AI photo scan technology built — GPT-4o Vision analyzes home photos" },
  { year: "Q2 2025", event: "130+ database tables, tRPC API, TiDB Cloud infrastructure deployed" },
  { year: "May 2026", event: "Founding Network waitlist launch — 2,125 charter spots available" },
  { year: "Q3 2026", event: "Lead matching algorithm goes live — first pro-homeowner matches" },
  { year: "2027", event: "Home Health Vault data licensing to insurance and mortgage industries" },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About ProLnk — The AI-Powered Home Services Network</title>
        <meta name="description" content="ProLnk connects home service professionals with homeowners through AI-powered matching, 5-stream income, and a 4-level referral network." />
      </Helmet>

      <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/">
            <span style={{ fontSize: 22, fontWeight: 900, color: TEAL, cursor: "pointer", letterSpacing: -0.5 }}>ProLnk</span>
          </Link>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/"><span style={{ color: "#94a3b8", fontSize: 14, cursor: "pointer" }}>Home</span></Link>
            <Link href="/founding-partner"><span style={{ color: "#94a3b8", fontSize: 14, cursor: "pointer" }}>Join Network</span></Link>
            <Link href="/partner-signup">
              <span style={{ background: TEAL, color: NAVY, padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Get Started
              </span>
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 32px 64px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
            <MapPin style={{ width: 14, height: 14, color: TEAL }} />
            <span style={{ fontSize: 12, color: TEAL, fontWeight: 600 }}>DFW, Texas · Est. 2024</span>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: "#fff", margin: "0 0 20px", lineHeight: 1.1, letterSpacing: -1 }}>
            We built the network<br />
            <span style={{ color: TEAL }}>home services deserves.</span>
          </h1>
          <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 48px" }}>
            ProLnk is the first home services marketplace built around the contractor — with AI matching, permanent income streams, and a 4-level referral network that keeps paying.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/founding-partner">
              <span style={{ background: YELLOW, color: NAVY, padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-block" }}>
                Join the Founding Network
              </span>
            </Link>
            <Link href="/get-quotes">
              <span style={{ background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", display: "inline-block" }}>
                I'm a Homeowner
              </span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24, textAlign: "center" }}>
                <s.icon style={{ width: 24, height: 24, color: TEAL, margin: "0 auto 12px" }} />
                <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", margin: "0 0 20px", lineHeight: 1.2 }}>
                Why we built ProLnk
              </h2>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
                Home service contractors are the backbone of America's housing infrastructure. They fix roofs, clear drains, and keep the lights on — yet they've historically been exploited by lead-gen platforms that charge $80/lead and deliver nothing.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
                ProLnk flips that model. Contractors join a network, refer other contractors, and build permanent income streams that compound over time. We handle AI matching, payment processing, and homeowner acquisition — you do the work and keep 72%.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["No pay-per-lead fees", "72% commission keep rate", "4-level referral overrides that pay forever", "AI lead matching — no cold outreach needed"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle style={{ width: 16, height: 16, color: TEAL, flexShrink: 0 }} />
                    <span style={{ color: "#cbd5e1", fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.1), rgba(8,145,178,0.05))", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 20, padding: 36 }}>
              <div style={{ fontSize: 14, color: TEAL, fontWeight: 700, marginBottom: 20 }}>THE NETWORK INCOME MODEL</div>
              {[
                { stream: "Stream 1", desc: "Direct commission from every matched job", rate: "Up to 70% keep" },
                { stream: "Stream 2", desc: "Override on your recruits' job earnings", rate: "1–4 levels deep" },
                { stream: "Stream 3", desc: "Monthly subscription override from referrals", rate: "10% recurring" },
                { stream: "Stream 4", desc: "Per-lead fee for homeowners you source", rate: "$25–100/lead" },
                { stream: "Stream 5", desc: "Permanent Home Vault origination rights", rate: "Forever" },
              ].map((s, i) => (
                <div key={s.stream} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: i < 4 ? 16 : 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(20,184,166,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: TEAL }}>{i + 1}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{s.stream}: {s.desc}</div>
                    <div style={{ fontSize: 11, color: TEAL, marginTop: 2 }}>{s.rate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", textAlign: "center", marginBottom: 48 }}>What we stand for</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {VALUES.map(v => (
                <div key={v.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(20,184,166,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <v.icon style={{ width: 22, height: 22, color: TEAL }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>{v.title}</h3>
                  <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", textAlign: "center", marginBottom: 48 }}>Our journey</h2>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 15, top: 0, bottom: 0, width: 2, background: "rgba(20,184,166,0.2)" }} />
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 28, marginBottom: 32, position: "relative" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: i === TIMELINE.length - 1 ? TEAL : "rgba(20,184,166,0.15)", border: "2px solid " + TEAL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === TIMELINE.length - 1 ? NAVY : TEAL }} />
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontSize: 12, color: TEAL, fontWeight: 700, marginBottom: 4 }}>{t.year}</div>
                    <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 }}>{t.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TrustyPro section */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, color: TEAL, fontWeight: 700, marginBottom: 12 }}>OUR SISTER PRODUCT</div>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 16px" }}>TrustyPro: AI Home Health</h2>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
                TrustyPro uses AI photo analysis to detect home maintenance issues before they become expensive emergencies. Homeowners scan their home, get a health score, and get connected with vetted ProLnk contractors.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["GPT-4o Vision", "Health Score 0-100", "Instant Issue Detection", "HIPAA Compliant"].map(tag => (
                  <span key={tag} style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#a5b4fc", fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <a href="https://trustypro.io" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: TEAL, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                  Visit TrustyPro.io <ChevronRight style={{ width: 14, height: 14 }} />
                </a>
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.04))", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 20, padding: 32, textAlign: "center" }}>
              <Camera style={{ width: 48, height: 48, color: "#818cf8", margin: "0 auto 16px" }} />
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Scan Any Room</div>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                Upload a photo and AI identifies issues in seconds — water damage, HVAC problems, structural concerns, and more.
              </p>
              <Link href="/trustypro/scan">
                <span style={{ background: "#6366f1", color: "#fff", padding: "12px 28px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-block" }}>
                  Try a Free Scan
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ fontSize: 12, color: TEAL, fontWeight: 700 }}>OUR MISSION</span>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 20, lineHeight: 1.3 }}>
              Connecting homeowners with trusted service professionals through AI-powered matching
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8 }}>
              Every homeowner deserves fast, reliable service from verified professionals. Every contractor deserves leads that convert, income that compounds, and a platform that works for them — not against them. ProLnk is how both sides win.
            </p>
          </div>
        </div>

        {/* Team */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", textAlign: "center", marginBottom: 48 }}>Our team</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 640, margin: "0 auto" }}>
              {TEAM.map(member => (
                <div key={member.name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28, textAlign: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(20,184,166,0.15)", border: "2px solid rgba(20,184,166,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 18, fontWeight: 800, color: TEAL }}>
                    {member.initials}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{member.name}</h3>
                  <div style={{ fontSize: 13, color: TEAL, fontWeight: 600, marginBottom: 12 }}>{member.role}</div>
                  <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 32px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 16 }}>
              Ready to own your income?
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              Join 2,125 contractors building the founding network. Charter spots are limited and will never be available again at these terms.
            </p>
            <Link href="/founding-partner">
              <span style={{ background: YELLOW, color: NAVY, padding: "16px 40px", borderRadius: 12, fontSize: 16, fontWeight: 900, cursor: "pointer", display: "inline-block" }}>
                Claim Your Founding Spot →
              </span>
            </Link>
            <p style={{ color: MUTED, fontSize: 12, marginTop: 16 }}>90-day free trial · $149/mo locked · Cancel anytime</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px", textAlign: "center" }}>
          <p style={{ color: MUTED, fontSize: 12, margin: 0 }}>
            © 2026 ProLnk · DFW, Texas ·{" "}
            <Link href="/legal/privacy-policy"><span style={{ color: TEAL, cursor: "pointer" }}>Privacy</span></Link>
            {" · "}
            <Link href="/legal/terms-of-service"><span style={{ color: TEAL, cursor: "pointer" }}>Terms</span></Link>
            {" · "}
            <a href="mailto:andrew@lit-ventures.com" style={{ color: TEAL }}>Contact</a>
          </p>
        </div>
      </div>
    </>
  );
}
