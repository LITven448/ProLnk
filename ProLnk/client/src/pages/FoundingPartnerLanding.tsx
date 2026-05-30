import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle, Users, TrendingUp, Shield, Zap, Lock, Star, ChevronDown, ChevronUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

const TIERS = [
  { name: "Charter Member", count: 25, color: "#E8A020", desc: "The founding 25. Highest network position, maximum commission depth." },
  { name: "Founding Member", count: 100, color: "#3B82F6", desc: "First wave of approved professionals. Same locked benefits." },
  { name: "Level 3 Partner", count: 400, color: "#10B981", desc: "Growing network body. Full founding benefits." },
  { name: "Level 4 Partner", count: 1600, color: "#8B5CF6", desc: "Broadest tier. Complete founding package secured." },
];

const BENEFITS = [
  { icon: Lock, title: "$149/mo Locked Forever", desc: "This rate never changes. Future partners pay more. You won\'t." },
  { icon: TrendingUp, title: "60% Commission Keep Rate", desc: "Highest tier on the platform — on jobs you complete." },
  { icon: Users, title: "4-Level Network Override", desc: "Earn on every job by up to 4 levels of your recruited network." },
  { icon: Shield, title: "1.5% Origination Rights", desc: "Earn forever on every job at every home you document first." },
  { icon: Zap, title: "AI-Generated Leads", desc: "Computer vision analyzes your photos for 65+ cross-trade opportunities." },
  { icon: Star, title: "90-Day Free Trial", desc: "Full access from day one. No credit card required to start." },
];

const NETWORK_RATES = [
  { level: "Direct Recruit (L1)", job: "7%", sub: "12%", example: "$42" },
  { level: "Their Recruits (L2)", job: "4%", sub: "6%", example: "$24" },
  { level: "L3 Network", job: "2%", sub: "3%", example: "$12" },
  { level: "L4 Network", job: "1%", sub: "1.5%", example: "$6" },
];

const FAQS = [
  { q: "What happens after the network closes?", a: "Once all 2,125 slots fill, the founding network closes permanently. Your position, rate, and origination rights are locked in for the lifetime of the platform." },
  { q: "Do I have to recruit to earn?", a: "No — you earn your 60% commission keep rate on every job you complete yourself, regardless of your network. Recruiting amplifies your earnings by adding network override income on top." },
  { q: "What if I document a home someone else later services?", a: "You keep 1.5% of the platform fee on every job completed at that address, forever. That\'s the origination right — it doesn\'t expire and it can\'t be taken away." },
  { q: "How does the 90-day trial work?", a: "You get full access to every platform feature from day one. Billing begins after 90 days at $149/month. You can cancel any time before then with no charge." },
  { q: "Is the $149/month rate really permanent?", a: "Yes. Contractually fixed at enrollment. ProLnk may raise rates for future standard-tier partners, but founding network members\' rates are locked at $149/month in perpetuity." },
];

export default function FoundingPartnerLanding() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { data: leaderboard } = trpc.proWaitlist.getLeaderboard.useQuery();

  const totalSignups = leaderboard?.totalSignups || 0;
  const spotsLeft = Math.max(0, 2125 - totalSignups);

  return (
    <div style={{ background: "#080C14", minHeight: "100vh", fontFamily: "'Inter', system-ui", color: "#F5F0E8" }}>
      
      {/* Nav */}
      <nav style={{ padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(245,240,232,0.06)" }}>
        <Link href="/"><span style={{ fontSize: 20, fontWeight: 700, cursor: "pointer" }}>ProLnk</span></Link>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/tier-benefits"><span style={{ fontSize: 14, color: "rgba(245,240,232,0.6)", cursor: "pointer" }}>View All Tiers</span></Link>
          <Link href="/apply">
            <button style={{ background: "#E8A020", color: "#080C14", border: "none", borderRadius: 100, padding: "10px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Apply Now →
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-block", border: "1px solid rgba(232,160,32,0.4)", borderRadius: 100, padding: "5px 16px", fontSize: 11, letterSpacing: "0.12em", color: "#E8A020", textTransform: "uppercase", marginBottom: 28 }}>
          ✦ Founding Network — {spotsLeft.toLocaleString()} of 2,125 spots remaining
        </div>
        <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}>
          The First 2,125 Pros<br />
          <span style={{ color: "#E8A020" }}>Own the Network Forever.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(245,240,232,0.65)", maxWidth: 660, margin: "0 auto 40px", lineHeight: 1.6 }}>
          ProLnk is building a closed, invitation-only commission network for qualified home service professionals. 
          The first 2,125 approved pros lock in the founding package — and it never becomes available again.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/apply">
            <button style={{ background: "#E8A020", color: "#080C14", border: "none", borderRadius: 100, padding: "16px 40px", fontSize: 17, fontWeight: 700, cursor: "pointer" }}>
              Apply to Join →
            </button>
          </Link>
          <Link href="/waitlist-status">
            <button style={{ background: "transparent", color: "#F5F0E8", border: "1px solid rgba(245,240,232,0.2)", borderRadius: 100, padding: "16px 40px", fontSize: 17, fontWeight: 600, cursor: "pointer" }}>
              Check My Status
            </button>
          </Link>
        </div>
      </div>

      {/* Tier breakdown */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 8 }}>4 Tiers. One Package.</h2>
        <p style={{ textAlign: "center", color: "rgba(245,240,232,0.55)", fontSize: 16, marginBottom: 40 }}>Every founding network tier gets the exact same locked benefits.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${tier.color}33`, borderTop: `3px solid ${tier.color}`, borderRadius: 16, padding: "24px 20px" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: tier.color, marginBottom: 4 }}>{tier.count}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{tier.name}</div>
              <div style={{ fontSize: 13, color: "rgba(245,240,232,0.55)", lineHeight: 1.5 }}>{tier.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 48 }}>The Founding Package</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "3px solid #E8A020", borderRadius: 16, padding: "24px 20px" }}>
                <Icon style={{ width: 22, height: 22, color: "#E8A020", marginBottom: 12 }} />
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 14, color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network rates table */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 12 }}>Network Override Rates</h2>
        <p style={{ textAlign: "center", color: "rgba(245,240,232,0.55)", marginBottom: 40 }}>
          Earn a percentage of the platform fee on every job completed by your network — forever.
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 20px", background: "rgba(255,255,255,0.04)", fontSize: 12, color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <span>Relationship</span><span style={{ textAlign: "center" }}>Job Commission</span><span style={{ textAlign: "center" }}>Subscription</span><span style={{ textAlign: "right" }}>On $600 fee</span>
          </div>
          {NETWORK_RATES.map((row, i) => (
            <div key={row.level} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", background: i === 0 ? "rgba(232,160,32,0.06)" : "transparent" }}>
              <span style={{ fontSize: 15, fontWeight: i === 0 ? 700 : 400 }}>{row.level}</span>
              <span style={{ textAlign: "center", color: "#E8A020", fontWeight: 700 }}>{row.job}</span>
              <span style={{ textAlign: "center", color: "#E8A020", fontWeight: 700 }}>{row.sub}</span>
              <span style={{ textAlign: "right", color: "#10B981", fontWeight: 600 }}>{row.example}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", textAlign: "center", marginTop: 12 }}>
          Example based on $5,000 job · 12% platform fee = $600 pool · Your completing professional keeps 100% of $4,400 job revenue
        </p>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, marginBottom: 40 }}>Common Questions</h2>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 16, marginBottom: 16 }}>
            <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              style={{ width: "100%", background: "none", border: "none", color: "#F5F0E8", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0, cursor: "pointer", fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>
              {faq.q}
              {expandedFaq === i ? <ChevronUp style={{ width: 16, height: 16, flexShrink: 0 }} /> : <ChevronDown style={{ width: 16, height: 16, flexShrink: 0 }} />}
            </button>
            {expandedFaq === i && (
              <p style={{ marginTop: 12, fontSize: 14, color: "rgba(245,240,232,0.65)", lineHeight: 1.7 }}>{faq.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "60px 24px 80px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, marginBottom: 20 }}>
          Don\'t Wait Until It\'s<br /><span style={{ color: "#E8A020" }}>Permanently Closed.</span>
        </h2>
        <p style={{ color: "rgba(245,240,232,0.6)", fontSize: 17, marginBottom: 32 }}>
          {spotsLeft.toLocaleString()} founding slots remaining. When they fill, the program closes forever.
        </p>
        <Link href="/apply">
          <button style={{ background: "#E8A020", color: "#080C14", border: "none", borderRadius: 100, padding: "18px 48px", fontSize: 18, fontWeight: 700, cursor: "pointer" }}>
            Apply for Founding Network →
          </button>
        </Link>
        <p style={{ fontSize: 12, color: "rgba(245,240,232,0.3)", marginTop: 16 }}>
          Applying is not the same as being accepted · ProLnk patent pending
        </p>
      </div>

    </div>
  );
}
