import React from 'react';
import { useRef, useEffect, useState, useRef as _useRef } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Videos served from /videos/ (Vite static public dir)
const V1 = "/videos/prolnk-media-1.mp4";
const V2 = "/videos/prolnk-media-2.mp4";
const V3 = "/videos/prolnk-media-3.mp4";
const V4 = "/videos/prolnk-media-4.mp4";

const GOLD = "#E8A020";
const NAVY = "#080C14";
const SURFACE = "#0D1424";
const CREAM = "#F5F0E8";
const BORDER = "rgba(255,255,255,0.07)";

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function loadPlayfair() {
  if (typeof document === "undefined") return;
  if (document.getElementById("playfair-font")) return;
  const link = document.createElement("link");
  link.id = "playfair-font";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap";
  document.head.appendChild(link);
}

// Full-bleed video background component with fallback gradient
function VideoHero({ src, overlay = "rgba(8,12,20,0.55)", fallbackGradient = "linear-gradient(135deg, #080C14 0%, #0D1424 50%, #111827 100%)", children }: {
  src: string;
  overlay?: string;
  fallbackGradient?: string;
  children: React.ReactNode;
}) {
  const [videoError, setVideoError] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {videoError ? (
        <div style={{ position: "absolute", inset: 0, background: fallbackGradient, zIndex: 0 }} />
      ) : (
        <video
          autoPlay muted loop playsInline
          src={src}
          onError={() => setVideoError(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, background: overlay, zIndex: 1 }} />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav({ onCta }: { onCta: () => void }) {
  const scrolled = useScrolled();
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(16px, 4vw, 56px)",
      background: scrolled ? "rgba(8,12,20,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
      transition: "background .4s, border-color .4s",
    }}>
      <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 20, color: CREAM }}>
        ProLnk <span style={{ color: GOLD }}>Media</span>
      </div>
      <div style={{ display: "flex", gap: 32, color: "rgba(245,240,232,0.6)", fontSize: 14 }}>
        {["Ad Formats", "Our Audience", "Pricing"].map(l => (
          <span key={l} style={{ cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,240,232,0.6)"; }}>
            {l}
          </span>
        ))}
      </div>
      <button onClick={onCta} style={{
        background: GOLD, color: "#080C14", border: "none",
        padding: "10px 24px", borderRadius: 100,
        fontWeight: 700, fontSize: 14, cursor: "pointer",
        fontFamily: "inherit",
      }}>
        Advertise With Us →
      </button>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero({ onCta }: { onCta: () => void }) {
  return (
    <VideoHero src={V1} overlay="rgba(8,12,20,0.5)">
      <div style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "80px clamp(16px, 6vw, 120px) 60px",
      }}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "inline-block",
            border: `1px solid ${GOLD}55`,
            borderRadius: 100,
            padding: "6px 18px",
            fontSize: 11, letterSpacing: "0.15em",
            color: GOLD, fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          ✦ Now accepting founding advertisers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 900,
            color: CREAM,
            lineHeight: 1.05,
            margin: "0 0 24px",
            maxWidth: 900,
          }}
        >
          Reach the Trades.<br />
          <em style={{ color: GOLD }}>Own the Neighborhood.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(245,240,232,0.72)",
            maxWidth: 620,
            lineHeight: 1.6,
            margin: "0 0 40px",
          }}
        >
          ProLnk Media connects your brand with verified home service professionals
          and homeowners across DFW — at the exact moment they're making buying decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}
        >
          <button onClick={onCta} style={{
            background: GOLD, color: NAVY,
            border: "none", borderRadius: 100,
            padding: "14px 32px", fontSize: 16, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            Join Advertiser Waitlist →
          </button>
          <button style={{
            background: "transparent",
            color: CREAM,
            border: `1px solid rgba(245,240,232,0.3)`,
            borderRadius: 100,
            padding: "14px 32px", fontSize: 16, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            View Ad Formats
          </button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{
            display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center",
            color: "rgba(245,240,232,0.45)", fontSize: 13,
          }}
        >
          {["500+ Verified Trade Partners", "94% Audience Engagement", "DFW Hyper-Local Network"].map((s, i) => (
            <span key={i}>{i > 0 ? "· " : ""}{s}</span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: 32, color: "rgba(245,240,232,0.4)", fontSize: 12, letterSpacing: "0.15em", textAlign: "center" }}
        >
          <div>SCROLL</div>
          <div style={{ fontSize: 18, marginTop: 4 }}>↓</div>
        </motion.div>
      </div>
    </VideoHero>
  );
}

// ─── Target audience strip ───────────────────────────────────────────────────
const AUDIENCE = [
  "🏠 Real Estate Agents", "💰 Mortgage Brokers", "📋 Title Companies",
  "🛡️ Homeowners Insurance", "🔍 Home Inspectors", "🏡 Interior Designers",
  "📜 Real Estate Attorneys", "🔧 Home Warranty Companies", "🏦 Lenders",
];

function AudienceStrip() {
  return (
    <div style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "20px clamp(16px,4vw,64px)" }}>
      <div style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.15em", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", marginBottom: 16 }}>
        Ideal for brands reaching the home services market
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", justifyContent: "center" }}>
        {AUDIENCE.map(a => (
          <span key={a} style={{ color: "rgba(245,240,232,0.55)", fontSize: 14 }}>{a}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Ad Formats (Video 2 background) ─────────────────────────────────────────
const FORMATS = [
  { icon: "📊", title: "Partner Dashboard Ads", desc: "Sponsored placements inside the ProLnk partner dashboard — seen by active, verified contractors every time they log in." },
  { icon: "✉️", title: "Email Digest Placements", desc: "Sponsored content in the ProLnk weekly digest — sent to verified pros and homeowners across DFW." },
  { icon: "🔔", title: "Event-Triggered Notifications", desc: "Reach pros at the moment of action — job completion, referral sent, payout received — with contextual brand messages." },
  { icon: "📍", title: "Neighborhood Targeting", desc: "Geo-targeted placements by ZIP code, neighborhood, or service area — reach the exact market you want to own." },
  { icon: "📄", title: "Homeowner Report Sponsorships", desc: "Your brand featured inside property intelligence reports delivered directly to homeowners in your target market." },
  { icon: "🔒", title: "Category Exclusivity", desc: "Lock out competitors. Own your category across the entire ProLnk network for a defined period." },
];

function AdFormats() {
  return (
    <VideoHero src={V2} overlay="rgba(8,12,20,0.82)">
      <div style={{ padding: "120px clamp(16px,5vw,80px)" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase", marginBottom: 16 }}>Ad Formats</div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: CREAM, margin: 0 }}>
              Every Touchpoint in the<br /><em style={{ color: GOLD }}>Trade Ecosystem.</em>
            </h2>
            <p style={{ color: "rgba(245,240,232,0.6)", marginTop: 20, fontSize: 18, maxWidth: 600, margin: "20px auto 0" }}>
              From job creation to payment to referral — your brand is there at every moment that matters.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, maxWidth: 1140, margin: "0 auto" }}>
          {FORMATS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${BORDER}`,
                borderLeft: `3px solid ${GOLD}`,
                borderRadius: 16,
                padding: "28px 24px",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(232,160,32,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: CREAM, marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 14, color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </VideoHero>
  );
}

// ─── Not Another Ad Network (Video 3 background) ─────────────────────────────
function About() {
  return (
    <VideoHero src={V3} overlay="rgba(8,12,20,0.78)">
      <div style={{ padding: "120px clamp(16px,5vw,80px)", maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase", marginBottom: 20 }}>About ProLnk Media</div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(40px,5vw,64px)", fontWeight: 900, color: CREAM, margin: "0 0 24px", lineHeight: 1.1 }}>
                Not Another<br /><em style={{ color: GOLD }}>Ad Network.</em>
              </h2>
              <p style={{ color: "rgba(245,240,232,0.7)", lineHeight: 1.7, fontSize: 17, marginBottom: 24 }}>
                ProLnk Media is the advertising arm of the ProLnk partner network — a verified community of licensed, insured home service professionals and the homeowners they serve across DFW.
              </p>
              <p style={{ color: "rgba(245,240,232,0.6)", lineHeight: 1.7, fontSize: 16, marginBottom: 32 }}>
                Every impression is earned. Every touchpoint is contextual. Your brand reaches verified pros and homeowners at the exact moment they're making decisions about tools, materials, insurance, and services.
              </p>
              {[
                "Zero cold audiences — every user is verified and active",
                "Hyper-local DFW targeting by ZIP, neighborhood, or service area",
                "Context-aware placements — not banner blindness",
                "First-party data from real job activity, not cookies",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ color: GOLD, fontSize: 16, marginTop: 2 }}>✦</span>
                  <span style={{ color: "rgba(245,240,232,0.7)", fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { num: "12K+", label: "Monthly homeowner touchpoints" },
                { num: "94%", label: "Audience engagement rate" },
                { num: "500+", label: "Verified trade partners" },
                { num: "65+", label: "Trade categories covered" },
              ].map(stat => (
                <div key={stat.num} style={{
                  background: "rgba(232,160,32,0.08)",
                  border: `1px solid rgba(232,160,32,0.2)`,
                  borderRadius: 16, padding: "28px 20px", textAlign: "center",
                }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 42, fontWeight: 900, color: GOLD }}>{stat.num}</div>
                  <div style={{ fontSize: 13, color: "rgba(245,240,232,0.55)", marginTop: 6, lineHeight: 1.4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </VideoHero>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
const TIERS = [
  { name: "Spotlight", price: "$499", unit: "/mo", highlight: false, features: ["Partner directory listing", "1 targeted email blast/mo", "Partner dashboard badge", "DFW geo-targeting", "Monthly performance report"] },
  { name: "Featured", price: "$1,499", unit: "/mo", highlight: true, features: ["Everything in Spotlight", "Priority dashboard placement", "Weekly email to 5K+ pros", "Event-triggered notifications", "Homeowner report sponsorship", "Dedicated account manager"] },
  { name: "Enterprise", price: "Custom", unit: "", highlight: false, features: ["Full network exclusivity", "Category lock-out", "Custom subsite build", "Social media integration", "Home sale history matching", "White-glove campaign management"] },
];

function Pricing({ onCta }: { onCta: () => void }) {
  return (
    <div style={{ background: SURFACE, padding: "120px clamp(16px,5vw,80px)" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase", marginBottom: 16 }}>Rate Card</div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, color: CREAM, margin: 0 }}>
            Campaign <em style={{ color: GOLD }}>Tiers.</em>
          </h2>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
        {TIERS.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.1}>
            <div style={{
              background: tier.highlight ? "rgba(232,160,32,0.08)" : "rgba(255,255,255,0.03)",
              border: `2px solid ${tier.highlight ? GOLD : BORDER}`,
              borderRadius: 20, padding: "36px 28px",
              position: "relative",
            }}>
              {tier.highlight && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: GOLD, color: NAVY, padding: "4px 16px", borderRadius: 100,
                  fontSize: 12, fontWeight: 700,
                }}>MOST POPULAR</div>
              )}
              <div style={{ fontSize: 14, color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>{tier.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 48, fontWeight: 900, color: CREAM }}>{tier.price}</span>
                <span style={{ color: "rgba(245,240,232,0.4)", fontSize: 16 }}>{tier.unit}</span>
              </div>
              {tier.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ color: GOLD }}>✓</span>
                  <span style={{ color: "rgba(245,240,232,0.65)", fontSize: 14 }}>{f}</span>
                </div>
              ))}
              <button onClick={onCta} style={{
                marginTop: 28, width: "100%",
                background: tier.highlight ? GOLD : "transparent",
                color: tier.highlight ? NAVY : CREAM,
                border: `1px solid ${tier.highlight ? GOLD : BORDER}`,
                borderRadius: 100, padding: "12px 24px",
                fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
              }}>
                {tier.price === "Custom" ? "Contact Sales →" : "Get Started →"}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── Close CTA (Video 4 background) ──────────────────────────────────────────
function CloseCta({ onCta }: { onCta: () => void }) {
  return (
    <VideoHero src={V4} overlay="rgba(8,12,20,0.7)">
      <div style={{
        minHeight: "70vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "80px clamp(16px,6vw,120px)",
      }}>
        <Reveal>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(48px,7vw,96px)", fontWeight: 900, color: CREAM, margin: "0 0 24px", lineHeight: 1.05 }}>
            Your Brand.<br />
            <em style={{ color: GOLD }}>Their Job Site.</em><br />
            Every Day.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ color: "rgba(245,240,232,0.6)", fontSize: 18, maxWidth: 520, margin: "0 0 40px" }}>
            Average campaign goes live in 48 hours. Founding advertiser pricing locked in for life.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <motion.button
            onClick={onCta}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: GOLD, color: NAVY,
              border: "none", borderRadius: 100,
              padding: "18px 48px", fontSize: 18, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: `0 0 40px ${GOLD}44`,
            }}
          >
            Join the Advertiser Waitlist →
          </motion.button>
        </Reveal>
      </div>
    </VideoHero>
  );
}

// ─── Contact Modal ────────────────────────────────────────────────────────────
function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <motion.div
      animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(8,12,20,0.85)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        padding: "0 16px",
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        animate={{ y: open ? 0 : 60, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: SURFACE, borderRadius: "20px 20px 0 0",
          width: "100%", maxWidth: 560,
          padding: "40px 32px 48px",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: CREAM, margin: 0 }}>Advertise With Us</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.4)", fontSize: 24, cursor: "pointer" }}>×</button>
        </div>
        {sent ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: 24, color: GOLD, marginBottom: 12 }}>You're on the list.</div>
            <div style={{ color: "rgba(245,240,232,0.6)" }}>We'll reach out within 24 hours to discuss your campaign.</div>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Company Name", type: "text", placeholder: "Your company" },
              { label: "Your Name", type: "text", placeholder: "Full name" },
              { label: "Email", type: "email", placeholder: "you@company.com" },
            ].map(field => (
              <div key={field.label}>
                <label style={{ display: "block", color: "rgba(245,240,232,0.5)", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} required
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", color: CREAM, fontSize: 15, boxSizing: "border-box" as const, outline: "none" }} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", color: "rgba(245,240,232,0.5)", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Monthly Budget</label>
              <select required style={{ width: "100%", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", color: CREAM, fontSize: 15, boxSizing: "border-box" as const }}>
                <option value="">Select budget range</option>
                <option>Under $500/mo</option>
                <option>$500 – $1,500/mo</option>
                <option>$1,500 – $5,000/mo</option>
                <option>$5,000+/mo</option>
              </select>
            </div>
            <button type="submit" style={{ background: GOLD, color: NAVY, border: "none", borderRadius: 100, padding: "14px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}>
              Submit →
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Partner Program ─────────────────────────────────────────────────────────
const PARTNER_TIERS = [
  {
    name: "Starter",
    price: "$999",
    unit: "/mo",
    tagline: "Get in front of the network",
    highlight: false,
    features: [
      "Verified pro directory listing",
      "1 sponsored email blast/mo",
      "Dashboard display placement",
      "DFW geo-targeting by ZIP",
      "Monthly campaign report",
      "Brand logo in partner portal",
    ],
  },
  {
    name: "Growth",
    price: "$2,999",
    unit: "/mo",
    tagline: "Dominate your category",
    highlight: true,
    features: [
      "Everything in Starter",
      "Priority feed placement",
      "Weekly email to 5K+ pros",
      "Event-triggered notifications",
      "Homeowner report sponsorships",
      "Dedicated account manager",
      "Category exclusivity (1 market)",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    tagline: "Full network ownership",
    highlight: false,
    features: [
      "Full network exclusivity",
      "Multi-market category lock-out",
      "Custom branded subsite build",
      "Social + SMS integration",
      "Home sale history matching",
      "White-glove campaign management",
      "Quarterly business reviews",
    ],
  },
];

function PartnerProgram({ onCta }: { onCta: () => void }) {
  return (
    <div style={{ background: NAVY, padding: "120px clamp(16px,5vw,80px)" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase", marginBottom: 16 }}>Partner Program</div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: CREAM, margin: "0 0 20px" }}>
            How Brands Partner<br /><em style={{ color: GOLD }}>With ProLnk.</em>
          </h2>
          <p style={{ color: "rgba(245,240,232,0.6)", fontSize: 18, maxWidth: 640, margin: "0 auto" }}>
            More than ad placements — a partnership that puts your brand inside the daily workflow of verified home service professionals and the homeowners they serve.
          </p>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto 80px" }}>
        {PARTNER_TIERS.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.1}>
            <div style={{
              background: tier.highlight ? `rgba(232,160,32,0.07)` : "rgba(255,255,255,0.025)",
              border: `2px solid ${tier.highlight ? GOLD : BORDER}`,
              borderRadius: 20, padding: "36px 28px",
              position: "relative",
            }}>
              {tier.highlight && (
                <div style={{
                  position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                  background: GOLD, color: NAVY, padding: "4px 18px", borderRadius: 100,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                }}>Most Popular</div>
              )}
              <div style={{ fontSize: 12, color: "rgba(245,240,232,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{tier.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 48, fontWeight: 900, color: CREAM }}>{tier.price}</span>
                <span style={{ color: "rgba(245,240,232,0.4)", fontSize: 15 }}>{tier.unit}</span>
              </div>
              <div style={{ fontSize: 13, color: GOLD, marginBottom: 24, fontStyle: "italic" }}>{tier.tagline}</div>
              {tier.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ color: GOLD, fontSize: 14 }}>✦</span>
                  <span style={{ color: "rgba(245,240,232,0.65)", fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
              <button onClick={onCta} style={{
                marginTop: 28, width: "100%",
                background: tier.highlight ? GOLD : "transparent",
                color: tier.highlight ? NAVY : CREAM,
                border: `1px solid ${tier.highlight ? GOLD : BORDER}`,
                borderRadius: 100, padding: "13px 24px",
                fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget.style.opacity = "0.85"); }}
              onMouseLeave={e => { (e.currentTarget.style.opacity = "1"); }}>
                {tier.price === "Custom" ? "Contact Sales →" : "Claim This Tier →"}
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* What makes a partner */}
      <Reveal>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          background: "rgba(232,160,32,0.05)",
          border: `1px solid rgba(232,160,32,0.15)`,
          borderRadius: 20,
          padding: "40px clamp(24px,5vw,56px)",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 32,
        }}>
          {[
            { num: "48hrs", label: "Average campaign launch time" },
            { num: "94%", label: "Audience engagement rate" },
            { num: "0 cookies", label: "First-party data only" },
            { num: "1 market", label: "DFW — hyper-local focus" },
          ].map(stat => (
            <div key={stat.num} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 36, fontWeight: 900, color: GOLD }}>{stat.num}</div>
              <div style={{ fontSize: 13, color: "rgba(245,240,232,0.5)", marginTop: 6, lineHeight: 1.4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

// ─── Inline advertiser capture ────────────────────────────────────────────────
function AdvertiserCapture() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, padding: "80px clamp(16px,5vw,80px)" }}>
      <Reveal>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: GOLD, textTransform: "uppercase", marginBottom: 16 }}>
            Get in Touch
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: CREAM, margin: "0 0 16px" }}>
            Ready to Reach the<br /><em style={{ color: GOLD }}>Home Services Market?</em>
          </h2>
          <p style={{ color: "rgba(245,240,232,0.55)", fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
            Drop your info and we'll reach out within one business day with available placements and founding advertiser rates.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "rgba(232,160,32,0.08)",
                border: `1px solid rgba(232,160,32,0.25)`,
                borderRadius: 16, padding: "32px",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>✦</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 24, color: GOLD, marginBottom: 8 }}>You're on the list.</div>
              <div style={{ color: "rgba(245,240,232,0.6)", fontSize: 15 }}>We'll reach out within one business day to discuss your campaign.</div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", color: "rgba(245,240,232,0.45)", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Company</label>
                  <input
                    type="text" required placeholder="Your company"
                    value={company} onChange={e => setCompany(e.target.value)}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", color: CREAM, fontSize: 15, boxSizing: "border-box" as const, outline: "none", fontFamily: "inherit" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "rgba(245,240,232,0.45)", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Work Email</label>
                  <input
                    type="email" required placeholder="you@company.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", color: CREAM, fontSize: 15, boxSizing: "border-box" as const, outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              </div>
              <button type="submit" style={{
                background: GOLD, color: NAVY, border: "none", borderRadius: 100,
                padding: "14px 32px", fontSize: 16, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit", marginTop: 4,
              }}>
                Request Advertiser Info →
              </button>
              <p style={{ color: "rgba(245,240,232,0.3)", fontSize: 12, textAlign: "center", margin: 0 }}>No spam. One response from a real human. Founding rates locked on reply.</p>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ProLnkMediaSite() {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => { loadPlayfair(); }, []);

  return (
    <div style={{ background: NAVY, fontFamily: "Inter, system-ui, sans-serif", color: CREAM, minHeight: "100vh" }}>
      <Helmet>
        <title>ProLnk Media — Advertise to Verified Home Service Pros & Homeowners</title>
        <meta name="description" content="Reach 500+ verified trade professionals and 12K+ DFW homeowners at the moment they're making buying decisions. Hyper-local, context-aware advertising — no banner blindness." />
        <meta name="keywords" content="advertise home services, contractor advertising, DFW home services marketing, reach homeowners, trade professional network advertising" />
        <meta property="og:title" content="ProLnk Media — Reach the Trades. Own the Neighborhood." />
        <meta property="og:description" content="Reach 500+ verified trade professionals and 12K+ DFW homeowners at the moment they're making buying decisions. Context-aware placements with first-party data." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.xyz/media" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ProLnk Media — Reach the Trades. Own the Neighborhood." />
        <meta name="twitter:description" content="Reach 500+ verified trade professionals and 12K+ DFW homeowners at the moment they're making buying decisions." />
        <meta name="twitter:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <link rel="canonical" href="https://prolnk.xyz/media" />
      </Helmet>
      <Nav onCta={() => setModalOpen(true)} />
      <Hero onCta={() => setModalOpen(true)} />
      <AudienceStrip />
      <AdFormats />
      <About />
      <PartnerProgram onCta={() => setModalOpen(true)} />
      <Pricing onCta={() => setModalOpen(true)} />
      <AdvertiserCapture />
      <CloseCta onCta={() => setModalOpen(true)} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
