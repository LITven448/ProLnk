/**
 * Trust Center — /trust
 * Public-facing page showing ProLnk's partner vetting standards, compliance
 * requirements, and trust signals for homeowners and prospective partners.
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  ShieldCheck, CheckCircle2, Star, Building2, FileText,
  Award, Lock, Eye, Phone, Zap, Users, TrendingUp,
  ChevronDown, ChevronUp, ExternalLink, BadgeCheck
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  navy:    "#0A1628",
  teal:    "#00B5B8",
  lime:    "#A8E063",
  white:   "#FFFFFF",
  offwhite:"#F8FAFC",
  muted:   "#64748B",
  border:  "#E2E8F0",
  card:    "#FFFFFF",
};

// ─── Vetting Standards ────────────────────────────────────────────────────────
const STANDARDS = [
  {
    icon: FileText,
    title: "Business License Verification",
    desc: "Every partner must provide a valid state business license. We verify directly with state databases before approval.",
    badge: "Required",
    color: "#3B82F6",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Certificate on File",
    desc: "Partners must carry general liability insurance with minimum $1M coverage. We verify COI before activation and monitor expiration.",
    badge: "Required",
    color: "#10B981",
  },
  {
    icon: Star,
    title: "Google Business Profile",
    desc: "We verify each partner's Google Business listing and require a minimum 4.0 star rating with at least 3 verified reviews.",
    badge: "Verified",
    color: "#F59E0B",
  },
  {
    icon: Building2,
    title: "BBB Accreditation Check",
    desc: "Partners are cross-referenced with the Better Business Bureau. Any unresolved complaints or ratings below B are flagged for review.",
    badge: "Checked",
    color: "#8B5CF6",
  },
  {
    icon: Zap,
    title: "FSM Software Integration",
    desc: "Partners using Jobber, Housecall Pro, ServiceTitan, or CompanyCam are verified through direct API integration — providing real job history.",
    badge: "Preferred",
    color: "#EC4899",
  },
  {
    icon: Eye,
    title: "Ongoing Performance Monitoring",
    desc: "Our Partner Performance Score (PPS) continuously monitors job completion rates, homeowner reviews, and response times.",
    badge: "Continuous",
    color: "#14B8A6",
  },
];

// ─── Trust Stats ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "100%", label: "License Verified" },
  { value: "$1M+", label: "Min. Liability Coverage" },
  { value: "4.0+", label: "Avg. Google Rating" },
  { value: "48hr", label: "Response Guarantee" },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How does ProLnk vet its partners?",
    a: "Every partner goes through a multi-step verification process including business license validation, insurance certificate review, Google Business profile verification, and BBB background check. Partners must meet a minimum threshold score before being approved.",
  },
  {
    q: "What happens if a partner doesn't perform?",
    a: "Our Partner Performance Score (PPS) continuously monitors all partners. If a partner's score drops below the minimum threshold, they are automatically flagged for review and may be suspended from receiving new leads until issues are resolved.",
  },
  {
    q: "Are partners background checked?",
    a: "Business license and BBB verification are required for all partners. Individual background checks are available as an optional add-on for partners who want to display the 'Background Checked' badge on their profile.",
  },
  {
    q: "What is the referral commission structure?",
    a: "ProLnk partners earn referral commissions when they refer a homeowner to another network partner and that job is completed. Commission rates vary by tier and service category, ranging from 3% to 8% of the job value.",
  },
  {
    q: "How are disputes handled?",
    a: "ProLnk has a dedicated dispute resolution process. Homeowners or partners can file a dispute through the platform. Our team reviews all disputes within 48 hours and mediates a resolution.",
  },
  {
    q: "Is my personal information secure?",
    a: "ProLnk uses bank-level encryption for all data. We never share your personal information with third parties without consent. All payment processing is handled by Stripe, a PCI-DSS Level 1 certified payment processor.",
  },
];

// ─── Compliance Badges ────────────────────────────────────────────────────────
const BADGES = [
  { icon: Lock,       label: "SSL Encrypted",    sub: "256-bit TLS" },
  { icon: BadgeCheck, label: "Stripe Payments",  sub: "PCI-DSS Level 1" },
  { icon: ShieldCheck,label: "SOC 2 Compliant",  sub: "Data Security" },
  { icon: FileText,   label: "CCPA Compliant",   sub: "Privacy First" },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: T.border }}
      onClick={() => setOpen(v => !v)}
    >
      <div className="flex items-center justify-between py-4 gap-4">
        <p className="text-sm font-semibold" style={{ color: T.navy }}>{q}</p>
        {open
          ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: T.teal }} />
          : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: T.muted }} />
        }
      </div>
      {open && (
        <p className="text-sm pb-4 leading-relaxed" style={{ color: T.muted }}>{a}</p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TrustCenter() {
  return (
    <div className="min-h-screen" style={{ background: T.offwhite }}>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: T.border }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <span className="text-lg font-black" style={{ color: T.navy }}>ProLnk</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/partners">
              <span className="text-sm font-medium" style={{ color: T.muted }}>Find a Pro</span>
            </Link>
            <Link href="/apply">
              <button
                className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: T.teal }}
              >
                Join Network
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="py-16 px-4" style={{ background: T.navy }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(0,181,184,0.15)", border: "1px solid rgba(0,181,184,0.3)" }}>
            <ShieldCheck className="w-4 h-4" style={{ color: T.teal }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: T.teal }}>Trust Center</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4 leading-tight">
            Every Partner Vetted.<br />Every Job Guaranteed.
          </h1>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
            ProLnk's multi-layer verification process ensures every professional in our network meets the highest standards for licensing, insurance, and customer service.
          </p>
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vetting Standards ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black mb-2" style={{ color: T.navy }}>Our Vetting Standards</h2>
            <p className="text-sm" style={{ color: T.muted }}>Six layers of verification before a partner is approved</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STANDARDS.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white rounded-2xl p-5 border" style={{ borderColor: T.border }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold" style={{ color: T.navy }}>{s.title}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${s.color}15`, color: s.color }}>{s.badge}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How PPS Works ── */}
      <section className="py-16 px-4" style={{ background: T.white }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black mb-2" style={{ color: T.navy }}>Partner Performance Score</h2>
            <p className="text-sm" style={{ color: T.muted }}>Real-time scoring keeps our network accountable</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Job Completion Rate",   weight: "30%", desc: "Percentage of accepted jobs that are completed on time", icon: CheckCircle2, color: "#10B981" },
              { label: "Homeowner Reviews",      weight: "25%", desc: "Average rating from verified homeowner reviews post-job", icon: Star,         color: "#F59E0B" },
              { label: "Response Time",          weight: "20%", desc: "Average time to respond to new lead notifications", icon: Phone,        color: "#3B82F6" },
              { label: "Referral Conversion",    weight: "15%", desc: "Percentage of referred leads that convert to closed jobs", icon: TrendingUp,   color: "#8B5CF6" },
              { label: "Network Contribution",   weight: "10%", desc: "Number of quality referrals sent to other partners", icon: Users,        color: "#EC4899" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl border" style={{ borderColor: T.border }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold" style={{ color: T.navy }}>{item.label}</p>
                      <span className="text-xs font-black" style={{ color: item.color }}>{item.weight}</span>
                    </div>
                    <p className="text-xs" style={{ color: T.muted }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Compliance Badges ── */}
      <section className="py-12 px-4" style={{ background: T.offwhite }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: T.muted }}>Platform Security & Compliance</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BADGES.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="bg-white rounded-2xl p-4 text-center border" style={{ borderColor: T.border }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${T.teal}15` }}>
                    <Icon className="w-5 h-5" style={{ color: T.teal }} />
                  </div>
                  <p className="text-xs font-bold" style={{ color: T.navy }}>{b.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: T.muted }}>{b.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4" style={{ background: T.white }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black mb-2" style={{ color: T.navy }}>Frequently Asked Questions</h2>
            <p className="text-sm" style={{ color: T.muted }}>Everything you need to know about our vetting process</p>
          </div>
          <div>
            {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4" style={{ background: T.navy }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-3">Ready to Join the Network?</h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            Apply in 5 minutes. Our team reviews applications within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/apply">
              <button className="px-8 py-3 rounded-xl font-bold text-sm" style={{ backgroundColor: T.teal, color: T.white }}>
                Apply as a Partner
              </button>
            </Link>
            <Link href="/partners">
              <button className="px-8 py-3 rounded-xl font-bold text-sm border" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
                Find a Pro
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-6 px-4 border-t" style={{ borderColor: T.border, background: T.offwhite }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: T.muted }}>© 2026 ProLnk Partner Network. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy"><span className="text-xs" style={{ color: T.muted }}>Privacy Policy</span></Link>
            <Link href="/terms"><span className="text-xs" style={{ color: T.muted }}>Terms of Service</span></Link>
            <a href="mailto:support@prolnk.com" className="text-xs" style={{ color: T.teal }}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
